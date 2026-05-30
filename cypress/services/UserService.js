import { apiRequest, apiUrl, buildUserPayload } from '../support/helpers/environment';
import {
  API_MESSAGES,
  USER_REQUIRED_FIELD_ERRORS,
} from '../utils/constants';

class UserService {
  createUser(user) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/usuarios'),
      body: buildUserPayload(user),
      failOnStatusCode: false,
    });
  }

  createUserWithPayload(payload) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/usuarios'),
      body: payload,
      failOnStatusCode: false,
    });
  }

  assertSuccessfulCreation(response) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq(API_MESSAGES.successfulCreation);
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertDuplicateEmailError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq(API_MESSAGES.duplicateEmail);
  }

  assertRequiredFieldsError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.nome).to.eq(USER_REQUIRED_FIELD_ERRORS.nome);
    expect(response.body.email).to.eq(USER_REQUIRED_FIELD_ERRORS.email);
    expect(response.body.password).to.eq(USER_REQUIRED_FIELD_ERRORS.password);
    expect(response.body.administrador).to.eq(USER_REQUIRED_FIELD_ERRORS.administrador);
  }
}

export default new UserService();
