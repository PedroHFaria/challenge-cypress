import UserService from '../../../services/UserService';

describe('API - Users - Create', () => {
  context('Success scenarios', () => {
    it('should register a user successfully with random data', () => {
      cy.generateRandomUser().then((user) => {
        UserService.createUser(user).then((response) => {
          UserService.assertSuccessfulCreation(response);
          cy.scheduleUserCleanupAfterLogin(user, response.body._id);
        });
      });
    });
  });

  context('Registration failure scenarios', () => {
    it('should return 400 when email is already in use', () => {
      cy.generateRandomUser().then((user) => {
        UserService.createUser(user).then((firstResponse) => {
          UserService.assertSuccessfulCreation(firstResponse);
          cy.scheduleUserCleanupAfterLogin(user, firstResponse.body._id);

          UserService.createUser(user).then((duplicateResponse) => {
            UserService.assertDuplicateEmailError(duplicateResponse);
          });
        });
      });
    });

    it('should return 400 when required fields are missing', () => {
      UserService.createUserWithPayload({}).then((response) => {
        UserService.assertRequiredFieldsError(response);
      });
    });
  });
});
