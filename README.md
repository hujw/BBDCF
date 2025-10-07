## Overview

Biobank Demo is a modular platform for dynamic consent management, supporting secure, participant-centric data governance in biomedical research. The system enables biobank participants to interact with digital consent forms, update preferences, and complete questionnaires, while providing administrators with tools for template management and user data review.

---

## Principle

Biobank Demo leverages blockchain-based dynamic consent and modern web technologies to address the challenges of data privacy, regulatory compliance, and participant empowerment. The platform integrates:

* Frontend (User Portal): A Nuxt.js/Vue application for participants to view, sign, and manage consent forms, complete questionnaires, and access personal reports.
* Manage (Admin Portal): A Vue.js application for administrators to create, edit, and manage consent templates and user data.

### Key features include:

* Immutable, auditable consent records via blockchain.
* Real-time consent update and revocation.
* Secure authorization and data sharing using cryptographic techniques.
* Modular structure for extensibility and maintainability.

---

## Directory Structure

```
BBCDF/
├── web/
│   ├── frontend/  # Nuxt.js (Vue) user portal
│   └── manage/    # Vue.js admin portal
├── docs/          # Documentation
├── plan3.md       # Restructuring plan (AEnet style)
└── README.md      # Project introduction
```

---

## Features

- **Dynamic Consent**: Blockchain-based, auditable consent records
- **User Portal**: Participants view, sign, and manage consent forms; complete questionnaires
- **Admin Portal**: Template creation/editing, user data review, system configuration
- **Security**: Proxy Re-Encryption, cryptographic authorization, secure data sharing
- **Extensibility**: Modular structure for easy maintenance and future expansion

---

## Installation & Quick Start

### Frontend (User Portal)
```powershell
cd web/frontend
yarn install
yarn dev
```

### Manage (Admin Portal)
```powershell
cd web/manage
yarn install
yarn serve
```

---

## Module Overview

### Frontend (web/frontend)
- Nuxt.js (Vue 2), Vuetify, Vuex, CKEditor
- Consent signing, questionnaire completion, user profile, notifications, report viewing

### Manage (web/manage)
- Vue.js, template editing, user management, system configuration

---


## License & Contact

- This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.
- Maintainer:
	- Blues 
	- hujw (jenweihu@gmail.com)

---

For questions or further documentation, see the individual module READMEs or contact the project maintainers.
