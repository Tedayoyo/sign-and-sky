import pytest

from appext.testing import ExtensionTestClient, service_mocks, test_user

from app.main import app, ext


@pytest.fixture
def client():
    c = ExtensionTestClient(app, user=test_user(sub="u-1", name="Yoyo"))
    yield c
    c.close()


def test_the_page_greets_the_signed_in_person(client):
    r = client.get("/")
    assert r.status_code == 200 and "Yoyo" in r.text and "SIGN" in r.text


def test_a_visitor_without_a_session_is_sent_to_the_sign_in():
    anon = ExtensionTestClient(app)
    r = anon.get("/", follow_redirects=False)
    anon.close()
    assert r.status_code == 302 and r.headers["location"].startswith("/auth/login")


def test_english_sign_is_understood_and_scored(client):
    r = client.get("/api/analyze", params={"text": "Ants are carrying eggs uphill", "place": "wol"})
    assert r.status_code == 200
    j = r.json()
    assert j["sign"] == "ants" and j["hits"] == 9 and j["source"].startswith("demo")


def test_amharic_sign_is_understood(client):
    j = client.get("/api/analyze", params={"text": "ጉንዳኖች እንቁላላቸውን ወደ ከፍታ እያጓጓዙ ነው", "place": "wol"}).json()
    assert j["sign"] == "ants"


def test_follow_up_question_uses_the_last_sign(client):
    j = client.get("/api/analyze", params={"text": "When should I sow?", "place": "tel", "last": "frog"}).json()
    assert j["sign"] is None and j["used"] == "frog" and j["hits"] == 8


def test_unknown_sign_is_not_invented(client):
    j = client.get("/api/analyze", params={"text": "my dog is barking", "place": "har"}).json()
    assert j["used"] is None and j["hits"] == 0


def test_live_mode_exchanges_a_token_for_the_rainfall_service(client, monkeypatch):
    import app.main as m
    monkeypatch.setattr(m, "MODE", "live")
    with service_mocks(ext) as mocks:
        route = mocks.get("spatiotemporal", f"/api/v2/collections/{m.RAIN_COLLECTION}/aggregate/time-series").respond(json={"values": [1, 2, 3]})
        j = client.get("/api/analyze", params={"text": "Frogs croak loudly", "place": "wol"}).json()
        assert route.called
    assert j["source"].startswith("Spatio-Temporal API") and j["collection"] == m.RAIN_COLLECTION
    assert client.token_requests == [("spatiotemporal", "spatio-temporal-api", ("spatio-temporal-read",), "user")]


def test_live_mode_falls_back_honestly_when_the_service_fails(client, monkeypatch):
    import app.main as m
    monkeypatch.setattr(m, "MODE", "live")
    with service_mocks(ext) as mocks:
        mocks.get("spatiotemporal", f"/api/v2/collections/{m.RAIN_COLLECTION}/aggregate/time-series").respond(status_code=500)
        j = client.get("/api/analyze", params={"text": "Frogs croak loudly", "place": "wol"}).json()
    assert "500" in j["source"]
