const API_BASE_URL = 'https://serverest.dev';

class CartsApi {
  buildPayload(productId, quantity = 1) {
    return {
      produtos: [
        {
          idProduto: productId,
          quantidade: quantity,
        },
      ],
    };
  }

  authenticateNewUser() {
    return cy.generateRandomUser({ isAdmin: true }).then((user) => {
      return cy
        .request({
          method: 'POST',
          url: `${API_BASE_URL}/usuarios`,
          body: {
            nome: user.name,
            email: user.email,
            password: user.password,
            administrador: 'true',
          },
        })
        .then(() => {
          return cy.request({
            method: 'POST',
            url: `${API_BASE_URL}/login`,
            body: {
              email: user.email,
              password: user.password,
            },
          });
        })
        .then((loginResponse) => {
          return cy.wrap({
            user,
            token: loginResponse.body.authorization,
          });
        });
    });
  }

  getFirstProductId() {
    return cy
      .request({
        method: 'GET',
        url: `${API_BASE_URL}/produtos`,
      })
      .then((response) => response.body.produtos[0]._id);
  }

  getCarts(token) {
    const options = {
      method: 'GET',
      url: `${API_BASE_URL}/carrinhos`,
      failOnStatusCode: false,
    };

    if (token) {
      options.headers = { Authorization: token };
    }

    return cy.request(options);
  }

  getCartById(cartId, token) {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/carrinhos/${cartId}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  }

  createCart(productId, token, quantity = 1) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/carrinhos`,
      headers: { Authorization: token },
      body: this.buildPayload(productId, quantity),
      failOnStatusCode: false,
    });
  }

  cancelPurchase(token) {
    return cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/carrinhos/cancelar-compra`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  }

  assertSuccessfulList(response) {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('carrinhos');
    expect(response.body.carrinhos).to.be.an('array');
    expect(response.body).to.have.property('quantidade');
  }

  assertSuccessfulCreation(response) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertSuccessfulCancellation(response) {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(
      'Registro excluído com sucesso. Estoque dos produtos reabastecido',
    );
  }

  assertCartNotFound(response) {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq('Carrinho não encontrado');
  }
}

export default new CartsApi();
