const API_BASE_URL = 'https://serverest.dev';

class LoginApi {
  login(credentials) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
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
    expect(response.body.message).to.eq('Email e/ou senha inválidos');
  }
}

export default new LoginApi();
