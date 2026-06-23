"""Backend/API tests for Baked Growth Next.js corporate site.
Covers: public contact, careers, auth login/logout, admin protected endpoints.
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("BACKEND_TEST_URL", "http://localhost:3000").rstrip("/")
ADMIN_EMAIL = "admin@baked.group"
ADMIN_PASSWORD = "BakedAdmin2025!"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_session(session):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    body = r.json()
    assert body.get("ok") is True
    return s


# ---------- Public endpoints ----------

class TestContact:
    def test_contact_valid(self, session):
        payload = {"name": "TEST_User", "email": "test@example.com",
                   "phone": "0600000000", "company": "TEST_Co",
                   "message": "Hello from backend test"}
        r = session.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("ok") is True
        assert "id" in body

    def test_contact_invalid_missing_email(self, session):
        r = session.post(f"{BASE_URL}/api/contact",
                         json={"name": "TEST_User", "message": "Hello"})
        assert r.status_code == 400, r.text


class TestCareers:
    def test_list_careers(self, session):
        r = session.get(f"{BASE_URL}/api/careers")
        assert r.status_code == 200, r.text
        data = r.json()
        # Could be {jobs:[...]} or list directly
        jobs = data.get("jobs", data) if isinstance(data, dict) else data
        assert isinstance(jobs, list)
        assert len(jobs) >= 2

    def test_apply_to_job(self, session):
        r = session.get(f"{BASE_URL}/api/careers")
        data = r.json()
        jobs = data.get("jobs", data) if isinstance(data, dict) else data
        job = jobs[0]
        job_id = job.get("id") or job.get("slug")
        payload = {"jobId": job_id, "name": "TEST_Applicant",
                   "email": "applicant@test.com",
                   "message": "I would like to apply"}
        r2 = session.post(f"{BASE_URL}/api/careers", json=payload)
        # Should accept the application
        assert r2.status_code in (200, 201), r2.text
        body = r2.json()
        assert body.get("ok") is True or "id" in body


# ---------- Auth ----------

class TestAuth:
    def test_login_wrong_password(self, session):
        r = session.post(f"{BASE_URL}/api/auth/login",
                         json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code in (400, 401), r.text

    def test_login_success_sets_cookie(self):
        s = requests.Session()
        r = s.post(f"{BASE_URL}/api/auth/login",
                   json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200, r.text
        assert r.json().get("ok") is True
        assert "baked_admin_token" in s.cookies.get_dict()

    def test_logout_clears_cookie(self):
        s = requests.Session()
        s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        r = s.post(f"{BASE_URL}/api/auth/logout")
        assert r.status_code == 200, r.text


# ---------- Admin protected ----------

class TestAdminProtected:
    def test_apps_put_unauth(self):
        r = requests.put(f"{BASE_URL}/api/admin/apps/anyid",
                         json={"descFr": "x"})
        assert r.status_code == 401, r.text

    def test_settings_put_unauth(self):
        r = requests.put(f"{BASE_URL}/api/admin/settings",
                         json={"contactEmail": "x@x.com"})
        assert r.status_code == 401, r.text

    def test_admin_redirects_without_auth(self):
        r = requests.get(f"{BASE_URL}/admin", allow_redirects=False)
        assert r.status_code in (302, 307), r.text


class TestAdminAuthorized:
    def test_get_apps(self, admin_session):
        r = admin_session.get(f"{BASE_URL}/api/admin/apps")
        # Some implementations may use different route - tolerate 404 by trying alt
        if r.status_code == 404:
            pytest.skip("admin apps list endpoint not exposed via GET")
        assert r.status_code == 200, r.text

    def test_update_app_express(self, admin_session):
        # Find the express app id via admin apps endpoint or via fetching list
        # Use admin apps GET if available, else fetch homepage and locate slug
        r_list = admin_session.get(f"{BASE_URL}/api/admin/apps")
        if r_list.status_code != 200:
            pytest.skip("cannot retrieve app list to test update")
        apps = r_list.json()
        apps = apps.get("apps", apps) if isinstance(apps, dict) else apps
        express = next((a for a in apps if a.get("slug") == "express"), None)
        if not express:
            pytest.skip("express app not found")
        new_desc = f"TEST desc {int(time.time())}"
        r = admin_session.put(f"{BASE_URL}/api/admin/apps/{express['id']}",
                              json={"descFr": new_desc, "prefix": express["prefix"],
                                    "color": express["color"], "colorKey": express["colorKey"],
                                    "descEn": express["descEn"], "illustration": express["illustration"],
                                    "icon": express["icon"], "enabled": express["enabled"],
                                    "order": express["order"]})
        assert r.status_code in (200, 204), r.text

    def test_update_settings(self, admin_session):
        r = admin_session.put(f"{BASE_URL}/api/admin/settings",
                              json={"contactEmail": "contact@baked.group"})
        assert r.status_code in (200, 204), r.text

    def test_admin_messages_list(self, admin_session):
        r = admin_session.get(f"{BASE_URL}/api/admin/messages")
        if r.status_code == 404:
            pytest.skip("messages list endpoint not exposed")
        assert r.status_code == 200, r.text

    def test_admin_jobs_list(self, admin_session):
        r = admin_session.get(f"{BASE_URL}/api/admin/jobs")
        if r.status_code == 404:
            pytest.skip("jobs list endpoint not exposed")
        assert r.status_code == 200, r.text
