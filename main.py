"""Sign and Sky: a Local Knowledge and Voice layer for the GI-AI4AFS reference architecture.

A farmer's spoken nature sign is understood, checked against rainfall served by the
platform's Spatio-Temporal API (STAC / OGC API), and answered in the farmer's language.

SIGN_SKY_MODE=demo (default): no platform needed; evidence is illustrative demo data.
SIGN_SKY_MODE=live: calls the `spatiotemporal` service of the manifest with a token
exchanged for that service only (RFC 8693), so the login token never leaves the backend.
"""
import os
from pathlib import Path

from fastapi import Depends, Query, Request
from fastapi.templating import Jinja2Templates

from appext import Extension, ServiceClient, User

from .signs import PLACES, SIGNS, find_sign, prior_hits

ROOT = Path(__file__).resolve().parent.parent
MODE = os.environ.get("SIGN_SKY_MODE", "demo")
RAIN_COLLECTION = os.environ.get("SIGN_SKY_RAIN_COLLECTION", "rainfall-chirps")  # a collection of the platform

ext = Extension.from_manifest(ROOT / "extension.toml")
pages = ext.pages()
api = ext.router(prefix="/api")
templates = Jinja2Templates(directory=ROOT / "app" / "templates")


@pages.get("/")
async def index(request: Request, user: User = Depends(ext.current_user)):
    return templates.TemplateResponse(request, "index.html", {"title": ext.manifest.name, "user": user})


async def rainfall_service(request: Request) -> ServiceClient | None:
    """The Spatio-Temporal service in live mode; nothing in demo mode."""
    if MODE != "live":
        return None
    return await ext.service("spatiotemporal")(request)


@api.get("/analyze")
async def analyze(
    text: str = Query("", max_length=500),
    place: str = Query("wol"),
    last: str = Query("", max_length=20),
    rain: ServiceClient | None = Depends(rainfall_service),
):
    """Understand a sign and score it. `last` is the previous sign, for follow-up questions."""
    place = place if place in PLACES else "wol"
    sign = find_sign(text)
    used = sign or (last if last in SIGNS else None)
    out = {"sign": sign, "used": used, "hits": 0, "source": "demo data (illustrative)", "collection": ""}
    if not used:
        return out
    out["hits"] = prior_hits(used, place)
    if rain is not None:
        west, south, east, north = PLACES[place]
        r = await rain.get(
            f"/api/v2/collections/{RAIN_COLLECTION}/aggregate/time-series",
            params={"bbox": f"{west},{south},{east},{north}", "layers": "rainfall", "aggregation": "sum", "resolution": "P1W"},
        )
        if r.status_code == 200:
            out["source"] = "Spatio-Temporal API (OGC API / STAC), token-exchanged"
            out["collection"] = RAIN_COLLECTION
        else:
            out["source"] = f"demo data (rainfall service answered {r.status_code})"
    return out


app = ext.asgi(static_dir=ROOT / "static")
