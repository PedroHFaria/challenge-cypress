import { apiRequest, apiUrl } from '../support/helpers/environment';
import { API_MESSAGES } from '../utils/constants';

class AuthService {
  login(credentials) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/login'),
      body: {
        email: credentials.email,
        password: credentials.password,
      },
      failOnStatusCode: false,
    });
  }

  assertSuccessfulLogin(response) {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('authorization');
    expect(response.body.authorization).to.be.a('string').and.not.be.empty;
  }

  assertInvalidCredentials(response) {
    expect(response.status).to.eq(401);
    expect(response.body.message).to.eq(API_MESSAGES.invalidCredentials);
  }
}

export default new AuthService();
