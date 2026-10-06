# Sign & Sky — a Local Knowledge & Voice layer

Farmers already forecast the rain from nature signs. Sign & Sky listens (English / Amharic),
tests the sign against rainfall served by the platform, and answers by voice.

Built as an `appext` extension for the GI-AI4AFS / AgriFoodData reference architecture.

## How it uses the open interfaces
| Need | Open interface | In this project |
|---|---|---|
| Sign-in, session | OpenID Connect + PKCE (SDK) | `Extension`, `ext.pages()`, `ext.router()` |
| Rainfall / vegetation evidence | Spatio-Temporal API (STAC 1.0, OGC API) | `ext.service("spatiotemporal")`, `GET /api/v2/collections/{id}/aggregate/time-series` |
| Least-privilege access | OAuth 2.0 token exchange (RFC 8693) | one token per service, never sent to the browser |
| Description for the App Store | `extension.toml` manifest | `appext manifest check` passes |

## Run
```bash
python3 -m venv .venv && . .venv/bin/activate
pip install -e ".[test]"        # needs appext (see the SDK repo)
pytest                          # 8 tests, no identity provider needed
# fill appext.toml with the platform's issuer and store_url, then:
appext dev                      # http://127.0.0.1:8100
SIGN_SKY_MODE=live APPEXT_SERVICE_SPATIOTEMPORAL_URL=https://spatio-temporal.<deployment> appext dev
```

## Honest status
- Demo mode needs no platform; scores are illustrative.
- Live mode calls the Spatio-Temporal time-series endpoint through token exchange (tested against a mock).
  Turning the series into a real per-sign score, and writing farmers' signs as SensorThings
  observations, are the next steps.
- Check the real `audience` / scope names with `appext store services` before registering.
