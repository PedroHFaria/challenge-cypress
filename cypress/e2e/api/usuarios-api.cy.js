import UsersApi from '../../support/api/UsersApi';

describe('API - Users', () => {
  context('Success scenarios', () => {
    it('should register a user successfully with random data', () => {
      cy.generateRandomUser().then((user) => {
        UsersApi.createUser(user).then((response) => {
          UsersApi.assertSuccessfulCreation(response);
        });
      });
    });
  });

  context('Registration failure scenarios', () => {
    it('should return 400 when email is already in use', () => {
      cy.generateRandomUser().then((user) => {
        UsersApi.createUser(user).then((firstResponse) => {
          UsersApi.assertSuccessfulCreation(firstResponse);

          UsersApi.createUser(user).then((duplicateResponse) => {
            UsersApi.assertDuplicateEmailError(duplicateResponse);
          });
        });
      });
    });

    it('should return 400 when required fields are missing', () => {
      UsersApi.createUserWithPayload({}).then((response) => {
        UsersApi.assertRequiredFieldsError(response);
      });
    });
  });
});
