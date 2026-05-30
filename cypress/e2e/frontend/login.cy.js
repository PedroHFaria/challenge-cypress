import LoginPage from '../../support/pages/LoginPage';

describe('Frontend - Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Success scenarios', () => {
    it('should login successfully with valid credentials', () => {
      cy.fixture('users').then(({ validUser }) => {
        cy.ensureUserExists(validUser);

        cy.intercept('POST', '**/login').as('loginRequest');

        LoginPage.login(validUser.email, validUser.password);

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
        LoginPage.assertSuccessfulLogin();
      });
    });
  });

  context('Authentication failure scenarios', () => {
    beforeEach(() => {
      cy.fixture('login').as('loginData');
    });

    it('should not login with invalid password', () => {
      cy.get('@loginData').then((loginData) => {
        cy.intercept('POST', '**/login').as('loginRequest');

        LoginPage.login(loginData.invalidPassword.email, loginData.invalidPassword.password);

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        LoginPage.assertInvalidCredentialsError();
      });
    });

    it('should not login with non-existent email', () => {
      cy.get('@loginData').then((loginData) => {
        cy.intercept('POST', '**/login').as('loginRequest');

        LoginPage.login(loginData.nonExistentEmail.email, loginData.nonExistentEmail.password);

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        LoginPage.assertInvalidCredentialsError();
      });
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
