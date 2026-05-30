import LoginApi from '../../support/api/LoginApi';

describe('API - Login', () => {
  context('Success scenarios', () => {
    it('should authenticate successfully with valid credentials', () => {
      cy.fixture('users').then(({ validUser }) => {
        cy.ensureUserExists(validUser);

        LoginApi.login(validUser).then((response) => {
          LoginApi.assertSuccessfulLogin(response);
        });
      });
    });
  });

  context('Authentication failure scenarios', () => {
    beforeEach(() => {
      cy.fixture('login').as('loginData');
    });

    it('should return 401 when password is invalid', () => {
      cy.fixture('users').then(({ validUser }) => {
        cy.ensureUserExists(validUser);

        cy.get('@loginData').then((loginData) => {
          LoginApi.login(loginData.invalidPassword).then((response) => {
            LoginApi.assertInvalidCredentials(response);
          });
        });
      });
    });

    it('should return 401 when email does not exist', () => {
      cy.get('@loginData').then((loginData) => {
        LoginApi.login(loginData.nonExistentEmail).then((response) => {
          LoginApi.assertInvalidCredentials(response);
        });
      });
    });
  });
});
