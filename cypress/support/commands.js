import { createRandomUser } from './utils/userFactory';

const API_BASE_URL = 'https://serverest.dev';

function buildUserPayload(user) {
  return {
    nome: user.name || 'Pedro Faria',
    email: user.email,
    password: user.password,
    administrador: 'true',
  };
}

function registerUser(user) {
  return cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body: buildUserPayload(user),
    failOnStatusCode: false,
  });
}

function loginUser(user) {
  return cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/login`,
    body: {
      email: user.email,
      password: user.password,
    },
    failOnStatusCode: false,
  });
}

function deleteUserByEmail(user, token) {
  return cy
    .request({
      method: 'GET',
      url: `${API_BASE_URL}/usuarios`,
      headers: { Authorization: token },
    })
    .then((response) => {
      const existingUser = response.body.usuarios.find(
        (registeredUser) => registeredUser.email === user.email,
      );

      if (!existingUser) {
        return;
      }

      return cy.request({
        method: 'DELETE',
        url: `${API_BASE_URL}/usuarios/${existingUser._id}`,
        headers: { Authorization: token },
        failOnStatusCode: false,
      });
    });
}

Cypress.Commands.add('ensureUserExists', (user) => {
  registerUser(user).then((registerResponse) => {
    if (registerResponse.status === 201) {
      return;
    }

    return loginUser(user).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);

      return deleteUserByEmail(user, loginResponse.body.authorization).then(() => {
        return registerUser(user).then((recreateResponse) => {
          expect(recreateResponse.status).to.eq(201);
        });
      });
    });
  });
});

Cypress.Commands.add('generateRandomUser', (options = {}) => {
  return createRandomUser(options);
});

Cypress.Commands.add('loginAsClient', () => {
  return cy.generateRandomUser({ isAdmin: false }).then((user) => {
    return cy
      .request({
        method: 'POST',
        url: `${API_BASE_URL}/usuarios`,
        body: {
          nome: user.name,
          email: user.email,
          password: user.password,
          administrador: 'false',
        },
      })
      .then(() => {
        return cy
          .request({
            method: 'POST',
            url: `${API_BASE_URL}/login`,
            body: {
              email: user.email,
              password: user.password,
            },
          })
          .then(({ body }) => {
            cy.visit('/home', {
              onBeforeLoad(win) {
                win.localStorage.setItem('serverest/userToken', body.authorization);
                win.localStorage.setItem('serverest/userEmail', user.email);
                win.localStorage.setItem('serverest/userNome', user.name);
                win.localStorage.setItem('products', '[]');
              },
            });
          });
      });
  });
});

Cypress.Commands.add('loginAsAdmin', (user) => {
  cy.ensureUserExists(user);

  return cy
    .request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: {
        email: user.email,
        password: user.password,
      },
    })
    .then(({ body }) => {
      cy.visit('/admin/cadastrarusuarios', {
        onBeforeLoad(win) {
          win.localStorage.setItem('serverest/userToken', body.authorization);
          win.localStorage.setItem('serverest/userEmail', user.email);
          win.localStorage.setItem('serverest/userNome', user.name);
        },
      });
    });
});
