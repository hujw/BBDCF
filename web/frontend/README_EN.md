# BioBank (biobankfrontend-demo)

This repository contains the front-end application for the Biobank project, built with Nuxt 2 (Vue 2) and Vuetify. This English README mirrors the main Chinese README and provides setup instructions, scripts, project structure, lint/test guidance, and common troubleshooting tips.

```
The project also uses `lint-staged` to lint staged files on commit.

# BioBank (biobankfrontend-demo)

This repository contains the front-end application for the Biobank project, built with Nuxt 2 (Vue 2) and Vuetify.

The README below was generated after scanning the project directory and includes an annotated project tree (selected files), installation and run instructions, scripts, env guidance, lint/testing, and troubleshooting tips.

## Quick links

- Project root: `biobankfrontend-demo/`
- Main entry: `pages/index.vue`
- Nuxt config: `nuxt.config.js`
- Package manifest: `package.json`

## Requirements

- Node.js: recommended v16.x (project recorded version: 16.20.1)
- Yarn: recommended (examples below use `yarn`)

## Install & Run (local development)

1. Install dependencies:

```powershell
yarn install
```

2. Start dev server (uses `.env.dev` by default via scripts):

```powershell
yarn dev
```

The dev server is expected to run at `http://localhost:8000` unless overridden by env settings.

## Build & Production

- Build for production:

```powershell
yarn build
```

- Start the built server:

```powershell
yarn start
```

- Generate static site:

```powershell
yarn generate            # uses .env.dev
yarn generate:staging    # uses .env.staging
yarn generate:prod       # uses .env.prod
```

## Linting & Tests

- Run lint checks:

```powershell
yarn lint:js
yarn lint:style
yarn lint
yarn lint:all
```

- Open Cypress for E2E tests:

```powershell
yarn cypress:dev
```

## Selected Project Tree (annotated)

The list below is derived from the repository scan. It shows key folders and representative files — not every image or scss partial, but the important structure to understand and work with the project.

```
biobankfrontend-demo/
├─ .eslintrc.js
├─ .prettierrc
├─ .gitignore
├─ default.conf
├─ jsconfig.json
├─ nuxt.config.js
├─ package.json
├─ yarn.lock
├─ README.md
├─ README_EN.md
├─ assets/
│  ├─ logo.png
│  ├─ images/
│  │  ├─ logo.png
│  │  ├─ logo.svg
│  │  └─ biobank/ (icons, qrcode, logos...)
│  └─ scss/
│     ├─ _global.scss
│     ├─ components/ (component-level scss partials)
│     ├─ utilities/ (spacing, sizing, position)
│     └─ variables/ (_variables.scss, _colors.scss)
├─ app/
│  └─ router.scrollBehavior.js
├─ components/
│  ├─ AuthDialog.vue
│  ├─ Captcha.vue
│  ├─ ConsentTable.vue
│  ├─ ConsentTemplate.vue
│  ├─ ConsentTemplate2.vue
│  ├─ Dialog.vue
│  ├─ LoadingDialog.vue
│  ├─ OtpDialog.vue
│  ├─ PwdGrade.vue
│  ├─ QuestionnaireTemplate.vue
│  ├─ QuestionnaireTable.vue
│  ├─ QuestionnaireProveTemplate.vue
│  ├─ SuccessDialog.vue
│  └─ base/
│     ├─ Btn.vue
│     ├─ BtnLong.vue
│     ├─ BtnNormal.vue
│     ├─ Card.vue
│     └─ Pagination.vue
├─ layouts/
│  ├─ default.vue
│  ├─ error.vue
│  ├─ Mobile.vue
│  └─ base/
│     ├─ AppBar.vue
│     ├─ Footer.vue
│     ├─ Index.vue
│     └─ View.vue
├─ pages/
│  ├─ index.vue
│  └─ myConsent/
│     ├─ index.vue
│     ├─ change/_id/index.vue
│     └─ prove/_id/index.vue
├─ plugins/
│  ├─ axios.js
│  ├─ route-guard.js
│  ├─ vue-dompurify-html.js
│  ├─ vue-slick.js
│  ├─ vue-svg-inline-plugin.client.js
│  ├─ vuex-pathify.js
│  ├─ vuex-persist.js
│  └─ zxcvbn.js
├─ store/
│  └─ index.js
├─ util/
│  ├─ apiDefinitions.js
│  ├─ auth.js
│  └─ helpers.js
├─ data/
│  └─ consent.json
├─ static/
│  ├─ favicon.ico
│  ├─ favicon-32x32.png
│  └─ v.png
```

## Notes on important folders

- `assets/` contains SASS partials and images. Developers should import SASS variables and main partials via the Nuxt build pipeline.
- `components/` holds Vue components used across pages; `components/base/` contains generic UI components (buttons, cards, pagination).
- `pages/` is where Nuxt auto-generates routes. See `pages/myConsent/*` for nested routes that include dynamic params (e.g. `_id`).
- `plugins/` registers client or universal plugins (e.g. axios and route guards). Files ending in `.client.js` are client-only.
- `store/` includes Vuex; this project uses `vuex-pathify` and `vuex-persist` to simplify state patterns and persistence.

## Components (selected)

Below are descriptions of key components found in `components/` and `components/base/`. These are the building blocks used across pages in this project.

- `ConsentTable.vue` (`components/ConsentTable.vue`)
	- Purpose: display a list/table of consent records using `v-data-table`.
	- Important props: `headerList` (Array), `bodyList` (Array), `loading` (Boolean), `btnName` (String), `btnColor` (String).
	- Notes: Renders each row with a long action button (`BtnLong`) to view the consent detail/proof route (example navigates to `/myConsent/prove/original`).

- `ConsentTemplate.vue` (`components/ConsentTemplate.vue`)
	- Purpose: render the detailed consent form content (validity section, questions, descriptions) and provide validation rules and controls for checkboxes/radios/fill-in answers.
	- Important props: `consentData` (Object, required), `isDisabled` (Boolean), `backgroundColor` (String).
	- Behavior: uses `v-dompurify-html` to safely render rich text, includes rules for required fields, and methods for resetting selections and normalizing textarea-to-HTML conversions.
	- Notes: This is central to both viewing and filling consent forms; it supports single/multiple choice, true/false, and free-text input types.

- `QuestionnaireTemplate.vue` (`components/QuestionnaireTemplate.vue`)
	- Purpose: render multi-page questionnaires with groups and subgroups, support for many UI types (fill-in, single, multiple, select, doubleSelect) and dynamic show/hide logic.
	- Important props: `questionnaireData` (Object, required), `isDisabled` (Boolean).
	- Behavior: handles pagination (group/subgroup), option-dependent jumps (show/hide other questions), repels (mutually exclusive options), and emits `upDateGroups` when data changes.
	- Notes: Uses `Pagination` base component for navigation between groups and subgroups.

- `AuthDialog.vue` (`components/AuthDialog.vue`)
	- Purpose: small modal dialog for account/auth related messages.
	- Important props: `dialogVisible` (Boolean), `title` (String), `content` (String), `accountError` (String).
	- Emits: `dialogClose` when the dialog is closed.

- `Captcha.vue` (`components/Captcha.vue`)
	- Purpose: renders a canvas-based numeric captcha and emits the generated code via `getCaptchaCode` event.
	- Notes: used in auth flows where a verification image is needed; draws 6 numeric characters and some noise.

- Base UI components (`components/base/`)
	- `Btn.vue` — lightweight wrapper around Vuetify `v-btn` with props for `color`, `btnName`, `width`, `textColor`.
	- `BtnLong.vue`, `BtnNormal.vue`, `Card.vue`, `Pagination.vue` — commonly used UI atoms across pages (pagination is used by questionnaire templates).

These components are designed to be reusable. When editing form logic, prefer updating the template components (`ConsentTemplate*`, `QuestionnaireTemplate`) since they contain the validation and show/hide behaviors.

## Pages (selected)

The `pages/` directory contains Nuxt pages (auto-routed). Below are the important routes and what they do.

- `/` (root) — `pages/index.vue` (Home)
	- Shows a carousel and a grid of navigation tiles (e.g., Latest Notice, Messages, My Consents, My Questionnaires, Medical Reports, My Profile).
	- On create it redirects to `/myConsent` in the current repo code.

- `/myConsent` — `pages/myConsent/index.vue` (MyConsent)
	- Shows the user's consent records split by tabs (signed consents shown by default).
	- Uses `ConsentTable` to display entries; example data is sourced from `data/consent.json` for demo purposes.

- `/myConsent/change/:id` — `pages/myConsent/change/_id/index.vue` (ChangeDetail)
	- Page for changing/updating a consent item. Loads a consent definition (demo uses `consent.json`) and renders `ConsentTemplate2` to allow edits.
	- Contains submit flow (example triggers a toast and redirects back to `/myConsent`).

- `/myConsent/prove/:id` — `pages/myConsent/prove/_id/index.vue` (ProveDetail)
	- View-only page for a consent proof/receipt. Renders the consent content using `ConsentTemplate2` (disabled) and shows timestamps and action buttons (close / request change).

Other pages referenced by navigation in `index.vue` (present in `navItems`) include routes such as `/bullectin`, `/message`, `/myQuestionnaire`, `/medicalReport`, `/member/settings` — these routes may map to additional pages/components elsewhere in the repository.

## How components and pages interact (notes)

- `pages/myConsent/*` pages load consent data (here demo content from `data/consent.json`) and pass it into `ConsentTemplate`/`ConsentTemplate2`. The consent template handles rendering the structure (validity, questions, descriptions) and validating user input.
- `QuestionnaireTemplate` is used where survey/questionnaire logic is needed; it contains advanced behavior like jump logic (`handleJump`), mutual exclusion (`handleRepels`), and pagination across groups and subgroups.
- Many components rely on plugins and store state: `plugins/` contains `axios.js`, `route-guard.js`, `vue-dompurify-html.js`, `vuex-pathify.js`, and `vuex-persist.js` which should be consulted when changing global behavior (auth, API calls, rich-text rendering, store persistence).

## Next steps I can help with

- Add brief usage examples for `ConsentTemplate` and `QuestionnaireTemplate` props and events.
- Create a `CONTRIBUTING.md` with development rules (linting, commit hooks).
- Generate a `.env.example` based on the `.env.*` names used in scripts.

Tell me which you'd like and I'll add it.
