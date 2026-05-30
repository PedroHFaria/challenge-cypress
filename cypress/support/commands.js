import { createRandomUser, createRandomProduct } from '../utils/faker';
import { scheduleCleanup, runCleanups } from './helpers/factories';
import {
  loginViaApi,
  cancelCart,
  deleteUserById,
  deleteProductById,
  registerUserViaApi,
  createProductViaApi,
} from './helpers/auth';

Cypress.Commands.add('scheduleUserCleanup', (userId, token) => {
  scheduleCleanup(() => {
    return cancelCart(token).then(() => deleteUserById(userId, token));
  });
});

Cypress.Commands.add('scheduleProductCleanup', (productId, token) => {
  scheduleCleanup(() => deleteProductById(productId, token));
});

Cypress.Commands.add('registerUserViaApi', (user) => {
  return registerUserViaApi(user).then((registerResponse) => {
    expect(registerResponse.status).to.eq(201);

    return cy.wrap({
      user,
      userId: registerResponse.body._id,
    });
  });
});

Cypress.Commands.add('createUserForTest', (options = {}) => {
  const isAdmin = options.isAdmin ?? true;

  return cy.generateRandomUser({ isAdmin }).then((user) => {
    return cy.registerUserViaApi(user).then(({ userId }) => {
      return loginViaApi(user).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);

        const token = loginResponse.body.authorization;

        cy.scheduleUserCleanup(userId, token);

        return cy.wrap({
          user,
          userId,
          token,
        });
      });
    });
  });
});

Cypress.Commands.add('createProductForTest', (token) => {
  return cy.generateRandomProduct().then((product) => {
    return createProductViaApi(product, token).then((response) => {
      expect(response.status).to.eq(201);

      const productId = response.body._id;

      cy.scheduleProductCleanup(productId, token);

      return cy.wrap({
        product,
        productId,
      });
    });
  });
});

Cypress.Commands.add('scheduleUserCleanupAfterLogin', (user, userId) => {
  return loginViaApi(user).then((loginResponse) => {
    expect(loginResponse.status).to.eq(200);
    cy.scheduleUserCleanup(userId, loginResponse.body.authorization);
  });
});

Cypress.Commands.add('generateRandomUser', (options = {}) => {
  return createRandomUser(options);
});

Cypress.Commands.add('generateRandomProduct', () => {
  return createRandomProduct();
});

Cypress.Commands.add('loginAsClient', () => {
  return cy.createUserForTest({ isAdmin: false }).then(({ user, token }) => {
    cy.visit('/home', {
      onBeforeLoad(win) {
        win.localStorage.setItem('serverest/userToken', token);
        win.localStorage.setItem('serverest/userEmail', user.email);
        win.localStorage.setItem('serverest/userNome', user.name);
        win.localStorage.setItem('products', '[]');
      },
    });

    return cy.wrap({ user, token });
  });
});

Cypress.Commands.add('loginAsAdmin', () => {
  return cy.createUserForTest({ isAdmin: true }).then(({ user, token }) => {
    cy.visit('/admin/cadastrarusuarios', {
      onBeforeLoad(win) {
        win.localStorage.setItem('serverest/userToken', token);
        win.localStorage.setItem('serverest/userEmail', user.email);
        win.localStorage.setItem('serverest/userNome', user.name);
      },
    });

    return cy.wrap({ user, token });
  });
});
