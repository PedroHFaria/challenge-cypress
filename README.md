# challenge-cypress

Cypress automation challenge for the [ServeRest](https://serverest.dev) application with E2E frontend and API tests in JavaScript.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Cypress interactive mode |
| `npm run cy:run` | Run all tests headless |
| `npm run test:api` | API tests only |
| `npm run test:frontend` | Frontend tests only |
| `npm run test:ci` | Full suite (CI) |

## Structure

```
cypress/
├── e2e/
│   ├── frontend/          # UI tests by domain (auth, users, shopping)
│   └── api/               # API tests by domain
├── fixtures/              # Static test data (api/, frontend/)
├── pages/                 # Page Object Model (UI)
├── services/              # API service layer
├── support/
│   ├── commands.js        # Custom Cypress commands
│   ├── e2e.js             # Global hooks
│   └── helpers/           # auth, environment, factories
├── utils/                 # constants, faker
└── reports/               # Test reports output
```
