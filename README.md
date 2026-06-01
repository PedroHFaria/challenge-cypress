# challenge-cypress

Automação de testes com **Cypress** para o [ServeRest](https://serverest.dev): cenários de **interface (E2E)** e **API**, em JavaScript.

- **23 testes** em 7 specs (11 frontend + 12 API)
- Frontend: `https://front.serverest.dev`
- API: `https://serverest.dev`

---

## Como rodar

**Requisitos:** Node.js 18+ e npm.

```bash
npm install
npm run cy:open      # modo interativo
npm run cy:run       # suite completa (headless)
npm run test:frontend
npm run test:api
npm run test:ci      # usado no GitHub Actions
```

Configuração do Cypress: `cypress.config.js` (raiz do projeto).  
URL da API: `cypress/utils/constants.js` → `API_BASE_URL`.

---

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── frontend/          # Testes de UI (auth, users, shopping)
│   └── api/               # Testes de API (auth, users, products, shopping)
├── pages/                 # Page Objects — seletores e ações da tela
├── services/              # Chamadas HTTP e asserções da API
├── support/
│   ├── commands.js        # Comandos customizados (setup de dados)
│   ├── e2e.js             # Hook afterEach — limpeza de dados
│   └── helpers/           # Cliente HTTP, auth, fila de cleanup
├── utils/                 # faker (dados aleatórios) e constants
└── fixtures/              # Reservado para JSON estático (hoje não usado)
```

| Pasta / arquivo | Papel |
|-----------------|--------|
| `e2e/**/*.cy.js` | Cenários de teste |
| `pages/` | `LoginPage`, `UserPage`, `DashboardPage` |
| `services/` | `AuthService`, `UserService`, `ProductService`, `CartService` |
| `support/commands.js` | Criar usuário/produto, login admin/cliente, agendar exclusão |
| `support/helpers/environment.js` | `cy.request`, URLs, montagem de payloads |
| `support/helpers/auth.js` | Login, cadastro e delete na API |
| `support/helpers/factories.js` | Fila executada no `afterEach` para apagar dados |
| `utils/faker.js` | Gera email, senha e produtos únicos por execução |

---

## Massa de dados

Os testes **não usam credenciais fixas**. O ServeRest apaga o banco de tempos em tempos.

1. **Gerar** — `faker.js` cria usuário/produto com valores únicos  
2. **Criar** — API (`POST /usuarios`, `POST /produtos`)  
3. **Testar** — UI ou API conforme o spec  
4. **Limpar** — `afterEach` cancela carrinho e remove usuário/produto criados  

Pastas `fixtures/api/` e `fixtures/frontend/` têm `.gitkeep` só para manter a estrutura no Git; os dados vêm do código, não de arquivos JSON.

---

## Testes

**Frontend**

| Arquivo | O que cobre |
|---------|-------------|
| `frontend/auth/login.cy.js` | Login (sucesso, erro, validação) |
| `frontend/users/cadastrarUsuarios.cy.js` | Cadastro de usuários pelo admin |
| `frontend/shopping/minhaListaDeProdutos.cy.js` | Lista de compras |

**API**

| Arquivo | O que cobre |
|---------|-------------|
| `api/auth/login-api.cy.js` | Autenticação |
| `api/users/create-user.cy.js` | Cadastro de usuários |
| `api/products/produtos-api.cy.js` | Produtos |
| `api/shopping/carrinhos-api.cy.js` | Carrinhos |

---

## Padrões usados

- **Page Object Model** na UI — specs sem seletores repetidos  
- **Service layer** na API — HTTP e asserts centralizados  
- **Setup via API + assert na UI** — preparação rápida, validação do que o usuário vê  
- **Retry** em respostas 503/429 e login 401 logo após cadastro (sem `cy.wait` fixo)  
- **CI** — `.github/workflows/cypress.yml` (push, PR e execução manual)

---

## Referências

- [ServeRest](https://serverest.dev)
- [Cypress](https://docs.cypress.io)
