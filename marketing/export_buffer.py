#!/usr/bin/env python3
# coding: utf-8
"""Generate copy-only channel exports from one campaign master. NEVER posts or logs in."""
import csv
import json
from pathlib import Path
from urllib.parse import urlencode
ROOT = Path(__file__).resolve().parent
master = json.loads((ROOT / "campaigns.json").read_text(encoding="utf-8"))
assert master["publication_status"] == "draft_only_not_published"
products = master["products"]
ids = [p["sticker_id"] for p in products]
assert len(ids) == len(set(ids)) and len(products) <= 10
def tracked(url, platform, campaign, content):
    return url + ("&" if "?" in url else "?") + urlencode({
        "utm_source": platform.lower().replace(" ", "_"),
        "utm_medium": "organic_social",
        "utm_campaign": campaign,
        "utm_content": content,
    })
def dongze_link(p, platform):
    return tracked(master["landing_base"], platform, p["campaign"], p["sticker_id"]) + p["anchor"]
for platform in ("Threads", "Facebook"):
    target = ROOT / ("Buffer_" + platform + "_DONGZE.csv")
    with target.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=["Text", "Image URL", "Tags", "Posting Time"])
        writer.writeheader()
        for p in products:
            text = p["caption_zh"].rstrip() + "\n\n" + dongze_link(p, platform) + "\n\n#東澤文創 #原創貼圖"
            writer.writerow({"Text":text, "Image URL":"", "Tags":"", "Posting Time":""})
    print(target.name, len(products), "copy-only draft rows")
# This is NOT a Buffer import file: assets, publishing rights and account authorization are missing.
pbc = master["pbc_discovery"]
target = ROOT / "PBC_Global_Platform_Copy.csv"
with target.open("w", encoding="utf-8-sig", newline="") as fh:
    cols = ["Content ID", "Platform", "Format needed", "Caption draft", "Landing URL (for bio or pin link)", "Asset source", "Asset readiness", "Publication status"]
    writer = csv.DictWriter(fh, fieldnames=cols)
    writer.writeheader()
    for item in pbc["content_pillars"]:
        for platform in pbc["platforms"]:
            landing = tracked(pbc["landing"], platform, "2026q4_pbc_world", item["id"].lower())
            cta = "Explore: " + landing if platform == "Pinterest" else item["action"]
            writer.writerow({
                "Content ID":item["id"], "Platform":platform,
                "Format needed":"Vertical original short video" if platform in ("TikTok", "YouTube Shorts") else "Original photo or vertical short video",
                "Caption draft":item["base_caption"] + "\n" + cta + "\n" + item["hashtags"],
                "Landing URL (for bio or pin link)":landing,
                "Asset source":item["visual_source"],
                "Asset readiness":item["asset_required"],
                "Publication status":"DRAFT ONLY - NOT POSTED",
            })
print(target.name, len(pbc["content_pillars"]) * len(pbc["platforms"]), "copy-only draft rows")
