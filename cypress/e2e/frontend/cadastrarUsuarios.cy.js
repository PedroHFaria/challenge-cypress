import RegisterUserPage from '../../support/pages/RegisterUserPage';

describe('Frontend - Register User (Admin)', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      cy.loginAsAdmin(validUser);
      RegisterUserPage.assertPageLoaded();
    });
  });

  context('Success scenarios', () => {
    it('should register a non-admin user successfully with random data', () => {
      cy.generateRandomUser().then((user) => {
        cy.intercept('POST', '**/usuarios').as('registerUserRequest');

        RegisterUserPage.register(user);

        cy.wait('@registerUserRequest').its('response.statusCode').should('eq', 201);
        RegisterUserPage.assertUserListRedirect();
        RegisterUserPage.assertUserListed(user);
        RegisterUserPage.assertUserAdminStatus(user, false);
      });
    });

    it('should register an administrator successfully with random data', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.intercept('POST', '**/usuarios').as('registerUserRequest');

        RegisterUserPage.register(user);

        cy.wait('@registerUserRequest').its('response.statusCode').should('eq', 201);
        RegisterUserPage.assertUserListRedirect();
        RegisterUserPage.assertUserListed(user);
        RegisterUserPage.assertUserAdminStatus(user, true);
      });
    });
  });

  context('Form validation scenarios', () => {
    it('should not register with empty required fields', () => {
      RegisterUserPage.submit();
      RegisterUserPage.assertRequiredFieldErrors();
    });
  });
});
