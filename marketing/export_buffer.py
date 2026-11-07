#!/usr/bin/env python3
# coding: utf-8
"""Generate platform CSVs from the one canonical JSON. Drafts only; never posts online."""
import csv
import json
from pathlib import Path
from urllib.parse import urlencode
ROOT=Path(__file__).resolve().parent
master=json.loads((ROOT/"campaigns.json").read_text(encoding="utf-8"))
assert master["publication_status"]=="draft_only_not_published", "Never auto-publish via this script"
products=master["products"]
ids=[p["sticker_id"] for p in products]
assert len(ids)==len(set(ids)) and len(products)<=10, "Duplicate products or exceeds Free queue cap"
def get_link(product,platform):
    query=urlencode(dict(utm_source=platform.lower(),utm_medium="organic_social",
                         utm_campaign=product["campaign"],utm_content=product["sticker_id"]))
    return master["landing_base"]+"?"+query+product["anchor"]
def one_post(product,platform):
    return product["caption_zh"].rstrip()+"\n\n"+get_link(product,platform)+"\n\n#東澤文創 #原創貼圖"
for platform in ("Threads","Facebook"):
    filename=ROOT/("Buffer_"+platform+"_DONGZE.csv")
    with filename.open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=["Text","Image URL","Tags","Posting Time"])
        w.writeheader()
        for product in products:
            w.writerow({"Text":one_post(product,platform),"Image URL":"","Tags":"","Posting Time":""})
    print(f"{filename.name}: {len(products)} draft rows")
