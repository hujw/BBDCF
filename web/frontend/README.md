This repository contains the front-end application for the Biobank project, built with Nuxt 2 (Vue 2) and Vuetify. This English README mirrors the main Chinese README and provides setup instructions, scripts, project structure, lint/test guidance, and common troubleshooting tips.

```
The project also uses `lint-staged` to lint staged files on commit.

## Quick links

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

## Notes on important folders

- `assets/` contains SASS partials and images. Developers should import SASS variables and main partials via the Nuxt build pipeline.
- `components/` holds Vue components used across pages; `components/base/` contains generic UI components (buttons, cards, pagination).
- `pages/` is where Nuxt auto-generates routes. See `pages/myConsent/*` for nested routes that include dynamic params (e.g. `_id`).
- `plugins/` registers client or universal plugins (e.g. axios and route guards). Files ending in `.client.js` are client-only.
- `store/` includes Vuex; this project uses `vuex-pathify` and `vuex-persist` to simplify state patterns and persistence.

## Components

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

## How components and pages interact (notes)

- `pages/myConsent/*` pages load consent data (here demo content from `data/consent.json`) and pass it into `ConsentTemplate`/`ConsentTemplate2`. The consent template handles rendering the structure (validity, questions, descriptions) and validating user input.
- `QuestionnaireTemplate` is used where survey/questionnaire logic is needed; it contains advanced behavior like jump logic (`handleJump`), mutual exclusion (`handleRepels`), and pagination across groups and subgroups.
- Many components rely on plugins and store state: `plugins/` contains `axios.js`, `route-guard.js`, `vue-dompurify-html.js`, `vuex-pathify.js`, and `vuex-persist.js` which should be consulted when changing global behavior (auth, API calls, rich-text rendering, store persistence).
