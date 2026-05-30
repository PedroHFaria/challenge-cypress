import UserPage from '../../../pages/UserPage';

describe('Frontend - Register User (Admin)', () => {
  beforeEach(() => {
    cy.loginAsAdmin().then(({ token }) => {
      cy.wrap(token).as('adminToken');
      UserPage.assertPageLoaded();
    });
  });

  context('Success scenarios', () => {
    it('should register a non-admin user successfully with random data', () => {
      cy.generateRandomUser().then((user) => {
        cy.intercept('POST', '**/usuarios').as('registerUserRequest');

        UserPage.register(user);

        cy.wait('@registerUserRequest').then(({ response }) => {
          expect(response.statusCode).to.eq(201);
          cy.get('@adminToken').then((adminToken) => {
            cy.scheduleUserCleanup(response.body._id, adminToken);
          });
        });

        UserPage.assertUserListRedirect();
        UserPage.assertUserListed(user);
        UserPage.assertUserAdminStatus(user, false);
      });
    });

    it('should register an administrator successfully with random data', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.intercept('POST', '**/usuarios').as('registerUserRequest');

        UserPage.register(user);

        cy.wait('@registerUserRequest').then(({ response }) => {
          expect(response.statusCode).to.eq(201);
          cy.get('@adminToken').then((adminToken) => {
            cy.scheduleUserCleanup(response.body._id, adminToken);
          });
        });

        UserPage.assertUserListRedirect();
        UserPage.assertUserListed(user);
        UserPage.assertUserAdminStatus(user, true);
      });
    });
  });

  context('Form validation scenarios', () => {
    it('should not register with empty required fields', () => {
      UserPage.submit();
      UserPage.assertRequiredFieldErrors();
    });
  });
});
