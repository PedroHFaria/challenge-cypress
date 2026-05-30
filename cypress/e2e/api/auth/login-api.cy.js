import AuthService from '../../../services/AuthService';

describe('API - Login', () => {
  context('Success scenarios', () => {
    it('should authenticate successfully with valid credentials', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.registerUserViaApi(user).then(({ userId }) => {
          AuthService.login(user).then((response) => {
            AuthService.assertSuccessfulLogin(response);
            cy.scheduleUserCleanup(userId, response.body.authorization);
          });
        });
      });
    });
  });

  context('Authentication failure scenarios', () => {
    it('should return 401 when password is invalid', () => {
      cy.generateRandomUser({ isAdmin: true }).then((user) => {
        cy.registerUserViaApi(user).then(({ userId }) => {
          AuthService.login({
            email: user.email,
            password: 'InvalidPassword123!',
          }).then((response) => {
            AuthService.assertInvalidCredentials(response);

            AuthService.login(user).then((loginResponse) => {
              cy.scheduleUserCleanup(userId, loginResponse.body.authorization);
            });
          });
        });
      });
    });

    it('should return 401 when email does not exist', () => {
      AuthService.login({
        email: 'usuario.inexistente@teste.com',
        password: 'Password1!',
      }).then((response) => {
        AuthService.assertInvalidCredentials(response);
      });
    });
  });
});
