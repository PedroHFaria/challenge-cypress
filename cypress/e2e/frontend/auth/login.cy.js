import LoginPage from '../../../pages/LoginPage';

describe('Frontend - Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Success scenarios', () => {
    it('should login successfully with valid credentials', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.registerUserViaApi(user).then(({ userId }) => {
          cy.intercept('POST', '**/login').as('loginRequest');

          LoginPage.login(user.email, user.password);

          cy.wait('@loginRequest').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            cy.scheduleUserCleanup(userId, response.body.authorization);
          });

          LoginPage.assertSuccessfulLogin();
        });
      });
    });
  });

  context('Authentication failure scenarios', () => {
    it('should not login with invalid password', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.registerUserViaApi(user).then(({ userId }) => {
          cy.intercept('POST', '**/login').as('loginRequest');

          LoginPage.login(user.email, 'InvalidPassword123!');

          cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
          LoginPage.assertInvalidCredentialsError();
          cy.scheduleUserCleanupAfterLogin(user, userId);
        });
      });
    });

    it('should not login with non-existent email', () => {
      cy.intercept('POST', '**/login').as('loginRequest');

      LoginPage.login('usuario.inexistente@teste.com', 'Password1!');

      cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
      LoginPage.assertInvalidCredentialsError();
    });
  });

  context('Form validation scenarios', () => {
    it('should not login with empty fields', () => {
      LoginPage.submit();
      LoginPage.assertRequiredFieldErrors();
    });

    it('should redirect to the registration page', () => {
      LoginPage.clickRegisterLink();
      LoginPage.assertRegisterPage();
    });
  });
});
