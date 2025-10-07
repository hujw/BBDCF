
# BioBank

## 啟動方式

### 環境需求
- Node.js: 16.20.1

### 安裝與啟動

```bash
# 安裝依賴
yarn install

# 啟動開發伺服器
# BioBank (biobankfrontend-demo)

本專案為 Biobank 前端介面（基於 Nuxt 2 + Vue 2 + Vuetify）。此 README 取代原本的簡短說明，補充專案結構、啟動、建置、檢查與常見問題排解。

## 主要特色

- 使用 Nuxt 2（支援 SSR 與靜態產生）
- Vuetify 作為 UI 元件庫
- Vuex 管理應用狀態（使用 `vuex-pathify` 與 `vuex-persist`）
- 富文本與圖表支援（CKEditor、ApexCharts）

## 環境需求

- Node.js：建議使用 v16.x（專案紀錄為 16.20.1）
- 套件管理器：yarn（可用 npm，但 README 範例以 yarn 為主）

## 快速開始

在專案根目錄執行：

```powershell
# 安裝相依套件
yarn install

# 啟動開發伺服器（使用 .env.dev，埠號 8000）
yarn dev
```

開發伺服器預期在 http://localhost:8000 運行（視 `.env` 設定而定）。

## 常用 scripts

（下列 script 來自 `package.json`）

- `yarn dev`：啟動開發伺服器（`--dotenv .env.dev`，port 8000）
- `yarn build`：建置（`--dotenv .env.dev`）
- `yarn start`：啟動已建置的生產伺服器
- `yarn generate`：靜態產生（`--dotenv .env.dev`）
- `yarn generate:staging`：靜態產生（`--dotenv .env.staging`）
- `yarn generate:prod`：靜態產生（`--dotenv .env.prod`）
- `yarn lint:js`：執行 ESLint（檢查 `.js`、`.vue`）
- `yarn lint:style`：執行 Stylelint（檢查 `.vue`、`.css`）
- `yarn lint`：同時執行 JS 與 style lint
- `yarn lint:all`：更完整的 eslint 檢查並嘗試自動修復
- `yarn cypress:dev`：開啟 Cypress 測試 UI

開發流程通常為 `yarn install` -> `yarn dev`。

## 主要相依套件（節錄）

- `nuxt`（v2.x）
- `vuetify`
- `vuex`, `vuex-pathify`, `vuex-persist`
- `@ckeditor/ckeditor5-vue2` 與多個 CKEditor builds
- `apexcharts`, `vue-apexcharts`

完整相依請見 `package.json`。

## 專案目錄重點

- `app/`：Nuxt 應用相關（assets、scss、router）
- `components/`：Vue 元件（含 base 與共用元件）
- `layouts/`：Nuxt 版面配置
- `pages/`：Nuxt 路由頁面（自動路由）
- `plugins/`：Nuxt 插件（axios、route-guard 等）
- `store/`：Vuex 狀態管理
- `static/`：靜態檔案
- `data/`：靜態或範例資料（如 consent.json）
- `util/`：工具函式（api 定義、auth、helpers）

## 環境變數

本項目在 `package.json` 的指令中使用 `--dotenv .env.*` 讀取不同環境設定（`.env.dev`、`.env.staging`、`.env.prod`）。若專案中沒有提供範本，請向原作者或團隊索取 `.env` 範本。

## Lint / 格式化

專案已設定 ESLint 與 Stylelint。常用指令：

```powershell
yarn lint
# 或分別
yarn lint:js
yarn lint:style
```

專案也使用 `lint-staged`，可在 commit 階段檢查 staged 檔案。

## 測試

- E2E：Cypress（`yarn cypress:dev` 打開 GUI）

## 常見問題與排解建議

- 安裝失敗：確認 Node 版本（建議 16.x）、yarn 版本，以及公司網路/代理設定。
- Nuxt 啟動異常：檢查 `.env.*` 是否缺少必要值；也可暫時移除 `--dotenv` 嘗試定位錯誤。
- 樣式或資源問題：執行 `yarn build` 檢查錯誤輸出。

## 進階與貢獻

- 若要提交 PR，請先確保 lint 通過且變更具說明性。

---

如果你需要：
- 英文版 README（我可以產生 `README_EN.md`）
- 更簡潔的快速入門版（直接列必要命令）

請告訴我偏好，我會再更新檔案。
```

開發伺服器將在 http://localhost:8000 啟動
