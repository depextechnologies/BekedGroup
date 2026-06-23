# Thin reverse-proxy that forwards /api/* requests to the Next.js app on port 3000.
# This file is ONLY used inside the Emergent platform because the platform ingress routes
# /api to port 8001 by convention. For Hostinger / Vercel / any standard host, Next.js
# serves /api routes natively and this file is unused (and the FastAPI service can be
# removed entirely from the deployment).

import os
import logging
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.responses import PlainTextResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("baked-proxy")

NEXT_TARGET = os.environ.get("NEXT_TARGET", "http://localhost:3000")

app = FastAPI(title="Baked Growth — Emergent proxy")

# Long-lived async client
_client: httpx.AsyncClient | None = None


@app.on_event("startup")
async def _startup():
    global _client
    _client = httpx.AsyncClient(timeout=60.0, follow_redirects=False)
    logger.info("Proxy started, forwarding /api/* -> %s", NEXT_TARGET)


@app.on_event("shutdown")
async def _shutdown():
    if _client:
        await _client.aclose()


@app.get("/")
async def root():
    return {"ok": True, "service": "baked-growth-proxy", "target": NEXT_TARGET}


@app.get("/api")
@app.get("/api/")
async def api_root():
    return {"ok": True, "service": "baked-growth", "info": "Next.js handles /api/* routes"}


HOP_BY_HOP = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-encoding", "content-length",
}


@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
async def proxy(path: str, request: Request):
    if _client is None:
        return PlainTextResponse("proxy not ready", status_code=503)

    url = f"{NEXT_TARGET}/api/{path}"
    if request.url.query:
        url = f"{url}?{request.url.query}"

    fwd_headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in HOP_BY_HOP and k.lower() != "host"
    }
    body = await request.body()

    try:
        upstream = await _client.request(
            request.method,
            url,
            headers=fwd_headers,
            content=body,
        )
    except httpx.RequestError as e:
        logger.error("upstream error: %s", e)
        return PlainTextResponse(f"upstream unavailable: {e}", status_code=502)

    resp_headers = {
        k: v for k, v in upstream.headers.items()
        if k.lower() not in HOP_BY_HOP
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=resp_headers,
        media_type=upstream.headers.get("content-type"),
    )
