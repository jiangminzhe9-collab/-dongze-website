# 東澤文創｜一稿多平台推廣（2026-11-07）

- Canonical campaigns: `campaigns.json`. Only update product, caption, UTM and links here, then run `python3 marketing/export_buffer.py` to regenerate both channel-specific CSVs.
- Source of product names and image anchors: `line-stickers/index.html` on the main branch. The three new product IDs compared with the 2026-11-06 pack are **37800181**, **37799627**, **37797877**.
- Buffer CSV uses the official four headers **Text / Image URL / Tags / Posting Time**. **Threads and Facebook only**. 8 text-only rows per channel. Instagram and Pinterest require images; YouTube has no CSV bulk upload; videos are not supported by CSV.
- Before importing, connect the company's own channels and download the current Buffer per-channel template. Import as drafts, inspect every image/link/claim, then schedule. A blank Posting Time can fill available queue slots; *do not accidentally choose immediate publication*.
- Neither this PR nor the script creates accounts, schedules, or publishes posts. Published social posts do not retroactively change when this JSON changes.
- Live website and LINE Store endpoints could not be independently loaded. These are **site-code-listed products**, not independently verified purchases or verified sales.
- `analytics.js` currently strips UTM parameters; separate draft PR [#3](https://github.com/jiangminzhe9-collab/-dongze-website/pull/3) proposes safe attribution. Test DebugView before merging that PR.
- The international Paperbagcrew brand remains **English / global / non-LINE / no unverified checkout claims**.

Official references:
- https://support.buffer.com/articles/how-to-upload-posts-in-bulk-to-buffer-cTIhl4mv6H
- https://buffer.com/pricing
- https://datareportal.com/reports/digital-2027-global-overview-report
- https://www.sec.gov/Archives/edgar/data/1506293/000150629326000151/q3-26xpressrelease.htm
