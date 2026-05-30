const API_BASE_URL = 'https://serverest.dev';

class UsersApi {
  buildPayload(user) {
    return {
      nome: user.name,
      email: user.email,
      password: user.password,
      administrador: user.isAdmin ? 'true' : 'false',
    };
  }

  createUser(user) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/usuarios`,
      body: this.buildPayload(user),
      failOnStatusCode: false,
    });
  }

  createUserWithPayload(payload) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/usuarios`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  getUsers() {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/usuarios`,
      failOnStatusCode: false,
    });
  }

  assertSuccessfulCreation(response) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertDuplicateEmailError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq('Este email já está sendo usado');
  }

  assertRequiredFieldsError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.nome).to.eq('nome é obrigatório');
    expect(response.body.email).to.eq('email é obrigatório');
    expect(response.body.password).to.eq('password é obrigatório');
    expect(response.body.administrador).to.eq('administrador é obrigatório');
  }
}

export default new UsersApi();
