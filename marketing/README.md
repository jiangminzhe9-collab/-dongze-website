# 東澤文創 × Paperbagcrew｜一稿多平台推廣（更新：2026-11-08）

- 只維護 **`marketing/campaigns.json`**；執行 `python3 marketing/export_buffer.py`，即可重產東澤 Threads、Facebook CSV，以及 PBC Instagram／TikTok／YouTube Shorts／Pinterest 的英文文案對照表。
- **東澤**：8 組官網程式確認的 LINE 貼圖主打（11/08 再查，與 11/07 相同），Threads / Facebook 各 8 篇純文字草稿，共 16 篇。唯一已確認的落地頁來源是 GitHub `main` 的 `line-stickers/index.html`；商店即時付款和銷量仍無獨立查證。
- **Paperbagcrew**：主站 `index.html` 含 Art District、DZ Studio、Crew Shop、Skate Park、Crew Loft。從 3 個內容主題延伸 4 平台英文文案，共 12 列；這些是 **copy-only drafts**，不是可直接批次發布的影音／圖片。不可宣稱商品可結帳或下載，也不可在此品牌宣傳 LINE。
- **帳號狀態**：沒有連上的社群登入或發布授權，故新建帳號 0、實際發布 0、實際排程 0。公司 Gmail 近 30 天搜尋相關平台寄件者沒有找到郵件，**不代表帳號一定不存在**；先確認原有帳號，避免重複開設。
- **Buffer**：官方 Free 連 3 個頻道，每頻道最多保留 10 篇；Bulk Upload 免費每頻道每次至多 10 篇且會受剩餘排程欄位限制。只有 Threads／Facebook 的純文字 CSV 可拿去對照官方模板後匯入 Draft；**影片、輪播及 YouTube 不支援 CSV**；Instagram 需圖檔，Pinterest 需看板及圖檔等欄位。
- **發布**：先授權公司擁有的社群頻道，再按 `Publish > channel settings > General > Bulk Upload > Download Template` 取得最新格式，匯入時選 Draft；核對原創圖片、版權、網址、文字後，才人工確認發布。既有的已發布貼文**不會**因更新 JSON 自動同步修改。
- **歸因問題**：`analytics.js` main 仍把整段 query 從 GA4 `page_location` 移除。修正 Draft PR [#3](https://github.com/jiangminzhe9-collab/-dongze-website/pull/3) 尚未實測與合併；不得稱 UTM 已能正確追蹤。此 PR [#4](https://github.com/jiangminzhe9-collab/-dongze-website/pull/4) 也是 Draft，**未部署正式站**。
- **轉換 KPI**：LINE 訂單與收入（需 LINE 後台）> `sticker_store_click` 次數（按 `sticker_id`）> 可歸因的官網到站 > 社群觀看。PBC 在未開通真正商品結帳前只計有效流量。

## 最新統計口徑
DataReportal 2026-10-21《Digital 2027》：2026 Q2 GWI 全球 16+ 網路成人月使用率 Facebook 58.1%、Instagram 56.6%、YouTube 56.2%、WhatsApp 54.9%、Messenger 37.9%。全球 58.1 億社群使用身分不等於獨立人頭。Pinterest 2026-10-29 公布 2026 Q3 MAU 6.61 億，這是**不同母體**，不得直接用百分比排名。

## 依據
- https://datareportal.com/reports/digital-2027-global-overview-report
- https://www.sec.gov/Archives/edgar/data/1506293/000150629326000151/q3-26xpressrelease.htm
- https://buffer.com/pricing
- https://support.buffer.com/articles/how-to-upload-posts-in-bulk-to-buffer-cTIhl4mv6H
- https://github.com/jiangminzhe9-collab/-dongze-website/blob/main/line-stickers/index.html
- https://github.com/jiangminzhe9-collab/Paperbagcrew-world/blob/main/index.html
