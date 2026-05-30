import LoginPage from '../../../pages/LoginPage';

describe('Frontend - Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Success scenarios', () => {
    it('should login successfully with valid credentials', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ user }) => {
        cy.intercept('POST', '**/login').as('loginRequest');

        LoginPage.login(user.email, user.password);

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
        LoginPage.assertSuccessfulLogin();
      });
    });
  });

  context('Authentication failure scenarios', () => {
    it('should not login with invalid password', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ user }) => {
        cy.intercept('POST', '**/login').as('loginRequest');

        LoginPage.login(user.email, 'InvalidPassword123!');

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        LoginPage.assertInvalidCredentialsError();
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
