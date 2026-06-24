"""
Phase 2 Admin CMS — Blog/News API + security regression tests.
Validates:
  - CRUD on /api/admin/blog and /api/admin/news work when authenticated
  - All admin endpoints (blog, news, jobs, apps, messages, settings) return 401 unauth
  - The FastAPI proxy cookie-leak bug is fixed: unauth → auth → unauth must STILL return 401
"""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get(
    "BACKEND_TEST_URL",
    "https://37d6e681-efa8-4629-8c0b-2fbf118ae402.preview.emergentagent.com",
).rstrip("/")
ADMIN_EMAIL = "admin@baked.group"
ADMIN_PASSWORD = "BakedAdmin2025!"


def _admin_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return s


# ---------- Unauthenticated 401 checks on all admin endpoints ----------

UNAUTH_ENDPOINTS = [
    ("GET",    "/api/admin/blog"),
    ("POST",   "/api/admin/blog"),
    ("PUT",    "/api/admin/blog/nonexistent"),
    ("DELETE", "/api/admin/blog/nonexistent"),
    ("GET",    "/api/admin/news"),
    ("POST",   "/api/admin/news"),
    ("PUT",    "/api/admin/news/nonexistent"),
    ("DELETE", "/api/admin/news/nonexistent"),
    ("GET",    "/api/admin/jobs"),
    ("GET",    "/api/admin/apps"),
    ("GET",    "/api/admin/messages"),
    ("PUT",    "/api/admin/settings"),
]


@pytest.mark.parametrize("method,path", UNAUTH_ENDPOINTS)
def test_admin_unauth_returns_401(method, path):
    r = requests.request(method, f"{BASE_URL}{path}", json={"x": "y"})
    assert r.status_code == 401, f"{method} {path} -> {r.status_code}: {r.text[:200]}"
    # Validate body shape
    try:
        body = r.json()
        assert body.get("ok") is False
        assert "error" in body
    except ValueError:
        pytest.fail(f"non-json body for {method} {path}: {r.text[:200]}")


# ---------- Proxy cookie-leak regression (the critical bug just fixed) ----------

def test_proxy_does_not_leak_cookies_between_calls():
    # 1) UNAUTH request -> expect 401
    r1 = requests.get(f"{BASE_URL}/api/admin/blog")
    assert r1.status_code == 401, f"step1 unauth got {r1.status_code}"

    # 2) AUTH request with valid cookie -> expect 200
    s = _admin_session()
    r2 = s.get(f"{BASE_URL}/api/admin/blog")
    assert r2.status_code == 200, f"step2 auth got {r2.status_code}: {r2.text[:200]}"

    # 3) ANOTHER UNAUTH request (no cookie) immediately after -> MUST still be 401
    r3 = requests.get(f"{BASE_URL}/api/admin/blog")
    assert r3.status_code == 401, (
        f"COOKIE LEAK! step3 unauth got {r3.status_code}: {r3.text[:200]}"
    )


# ---------- Blog CRUD ----------

class TestBlogCRUD:
    def test_blog_crud_full_lifecycle(self):
        s = _admin_session()
        slug = f"test-post-{int(time.time())}"
        payload = {
            "slug": slug,
            "titleFr": "TEST Titre FR",
            "titleEn": "TEST Title EN",
            "excerptFr": "FR excerpt",
            "excerptEn": "EN excerpt",
            "contentFr": "# FR content",
            "contentEn": "# EN content",
            "featuredImage": "https://example.com/img.jpg",
            "category": "Press",
            "metaTitleFr": "",
            "metaTitleEn": "",
            "metaDescFr": "",
            "metaDescEn": "",
            "published": True,
        }
        # CREATE
        r = s.post(f"{BASE_URL}/api/admin/blog", json=payload)
        assert r.status_code in (200, 201), r.text
        post = r.json().get("post") or r.json()
        assert post["titleFr"] == "TEST Titre FR"
        assert post["titleEn"] == "TEST Title EN"
        assert post["category"] == "Press"
        assert post["published"] is True
        pid = post["id"]

        # LIST contains it
        r2 = s.get(f"{BASE_URL}/api/admin/blog")
        assert r2.status_code == 200
        body = r2.json()
        items = body.get("posts", body) if isinstance(body, dict) else body
        assert any(p["id"] == pid for p in items)

        # UPDATE
        upd = {**post, "titleFr": "TEST Titre FR updated"}
        r3 = s.put(f"{BASE_URL}/api/admin/blog/{pid}", json=upd)
        assert r3.status_code == 200, r3.text
        upd_post = r3.json().get("post") or r3.json()
        assert upd_post["titleFr"] == "TEST Titre FR updated"

        # DELETE
        r4 = s.delete(f"{BASE_URL}/api/admin/blog/{pid}")
        assert r4.status_code in (200, 204), r4.text

        # Verify gone
        r5 = s.get(f"{BASE_URL}/api/admin/blog")
        items5 = r5.json().get("posts", r5.json())
        assert not any(p["id"] == pid for p in items5)


# ---------- News CRUD ----------

class TestNewsCRUD:
    def test_news_crud_full_lifecycle(self):
        s = _admin_session()
        slug = f"test-news-{int(time.time())}"
        payload = {
            "slug": slug,
            "titleFr": "TEST News FR",
            "titleEn": "TEST News EN",
            "bodyFr": "## FR body",
            "bodyEn": "## EN body",
            "image": "https://example.com/cov.jpg",
            "published": True,
        }
        r = s.post(f"{BASE_URL}/api/admin/news", json=payload)
        assert r.status_code in (200, 201), r.text
        art = r.json().get("article") or r.json().get("news") or r.json()
        assert art["titleFr"] == "TEST News FR"
        assert art["published"] is True
        aid = art["id"]

        # UPDATE
        upd = {**art, "titleFr": "TEST News FR upd"}
        r2 = s.put(f"{BASE_URL}/api/admin/news/{aid}", json=upd)
        assert r2.status_code == 200, r2.text
        upd_art = r2.json().get("article") or r2.json().get("news") or r2.json()
        assert upd_art["titleFr"] == "TEST News FR upd"

        # DELETE
        r3 = s.delete(f"{BASE_URL}/api/admin/news/{aid}")
        assert r3.status_code in (200, 204), r3.text


# ---------- Public site regression smoke ----------

@pytest.mark.parametrize("path", ["/", "/about-us", "/services", "/careers"])
def test_public_pages_load(path):
    r = requests.get(f"{BASE_URL}{path}")
    assert r.status_code == 200, f"{path} -> {r.status_code}"
    assert len(r.text) > 500
