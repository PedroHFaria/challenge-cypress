const API_BASE_URL = 'https://serverest.dev';

class ProductsApi {
  buildPayload(product) {
    return {
      nome: product.name,
      preco: product.price,
      descricao: product.description,
      quantidade: product.quantity,
    };
  }

  authenticate(user) {
    cy.ensureUserExists(user);

    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: {
        email: user.email,
        password: user.password,
      },
    });
  }

  createProduct(product, token) {
    const options = {
      method: 'POST',
      url: `${API_BASE_URL}/produtos`,
      body: this.buildPayload(product),
      failOnStatusCode: false,
    };

    if (token) {
      options.headers = { Authorization: token };
    }

    return cy.request(options);
  }

  createProductWithPayload(payload, token) {
    const options = {
      method: 'POST',
      url: `${API_BASE_URL}/produtos`,
      body: payload,
      failOnStatusCode: false,
    };

    if (token) {
      options.headers = { Authorization: token };
    }

    return cy.request(options);
  }

  getProducts() {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/produtos`,
      failOnStatusCode: false,
    });
  }

  assertSuccessfulCreation(response) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertMissingTokenError(response) {
    expect(response.status).to.eq(401);
    expect(response.body.message).to.eq(
      'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
    );
  }

  assertRequiredFieldsError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.nome).to.eq('nome é obrigatório');
    expect(response.body.preco).to.eq('preco é obrigatório');
    expect(response.body.descricao).to.eq('descricao é obrigatório');
    expect(response.body.quantidade).to.eq('quantidade é obrigatório');
  }
}

export default new ProductsApi();
