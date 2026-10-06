"""Sign catalogue: which spoken words point to which nature sign, plus a prior score.

The prior (hits out of 10 past seasons) is illustrative demo data. In a real
deployment it is replaced by scores computed from the platform's rainfall layers
and from farmers' own reports; the id and the shape stay the same.
"""
SIGNS = {
    "flower": (["flower", "bloom", "blossom", "አበበ", "አበባ", "አበቀ", "ማበብ"], {"wol": 8, "tel": 8, "har": 7}),
    "ants": (["ant", "termite", "ጉንዳ"], {"wol": 9, "tel": 8, "har": 8}),
    "frog": (["frog", "croak", "toad", "እንቁራሪ"], {"wol": 8, "tel": 8, "har": 7}),
    "birds": (["bird", "swallow", "cuckoo", "stork", "crane", "sparrow", "ወፍ", "ወፎች"], {"wol": 7, "tel": 7, "har": 6}),
    "halo": (["halo", "ring around", "ቀለበት"], {"wol": 6, "tel": 7, "har": 7}),
    "wind": (["east wind", "wind from the east", "eastern wind", "wind turned", "wind changed", "wind direction", "ምሥራቅ", "ምስራቅ", "ንፋስ", "ነፋስ"], {"wol": 7, "tel": 7, "har": 8}),
    "dragon": (["dragonfl", "flying low", "ነፍሳት"], {"wol": 6, "tel": 6, "har": 6}),
    "hot": (["hot night", "very hot", "humid", "sticky", "no wind", "still air", "ሞቃት", "እርጥበት", "ሙቀት"], {"wol": 7, "tel": 7, "har": 7}),
    "crow": (["crow", "nest", "owl", "ቁራ", "ጎጆ"], {"wol": 4, "tel": 5, "har": 4}),
    "cloud": (["red sky", "red clouds", "evening sky", "sunset", "ቀይ ሰማይ", "ቀዩ ሰማይ"], {"wol": 6, "tel": 6, "har": 7}),
}

# Rough bounding boxes (west, south, east, north) used to ask the Spatio-Temporal API
# for rainfall over the farmer's area. Approximate; a real deployment uses the farmer's field.
PLACES = {
    "wol": (37.5, 6.6, 38.4, 7.2),
    "tel": (77.2, 16.0, 81.8, 19.9),
    "har": (74.4, 27.7, 77.6, 30.9),
}


def find_sign(text: str) -> str | None:
    q = text.lower()
    for sid, (words, _) in SIGNS.items():
        if any(w in q for w in words):
            return sid
    return None


def prior_hits(sign_id: str, place: str) -> int:
    return SIGNS[sign_id][1][place]
