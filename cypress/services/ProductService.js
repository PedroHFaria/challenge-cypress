import {
  apiRequest,
  apiUrl,
  buildAuthHeaders,
  buildProductPayload,
} from '../support/helpers/environment';
import {
  API_MESSAGES,
  PRODUCT_REQUIRED_FIELD_ERRORS,
} from '../utils/constants';

class ProductService {
  createProduct(product, token) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/produtos'),
      headers: buildAuthHeaders(token),
      body: buildProductPayload(product),
      failOnStatusCode: false,
    });
  }

  createProductWithPayload(payload, token) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/produtos'),
      headers: buildAuthHeaders(token),
      body: payload,
      failOnStatusCode: false,
    });
  }

  getProducts() {
    return apiRequest({
      method: 'GET',
      url: apiUrl('/produtos'),
      failOnStatusCode: false,
    });
  }

  assertSuccessfulCreation(response) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq(API_MESSAGES.successfulCreation);
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertMissingTokenError(response) {
    expect(response.status).to.eq(401);
    expect(response.body.message).to.eq(API_MESSAGES.missingToken);
  }

  assertRequiredFieldsError(response) {
    expect(response.status).to.eq(400);
    expect(response.body.nome).to.eq(PRODUCT_REQUIRED_FIELD_ERRORS.nome);
    expect(response.body.preco).to.eq(PRODUCT_REQUIRED_FIELD_ERRORS.preco);
    expect(response.body.descricao).to.eq(PRODUCT_REQUIRED_FIELD_ERRORS.descricao);
    expect(response.body.quantidade).to.eq(PRODUCT_REQUIRED_FIELD_ERRORS.quantidade);
  }
}

export default new ProductService();
