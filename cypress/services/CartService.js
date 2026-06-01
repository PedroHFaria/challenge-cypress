import {
  apiRequest,
  apiUrl,
  buildAuthHeaders,
  buildCartPayload,
} from '../support/helpers/environment';
import { API_MESSAGES } from '../utils/constants';

class CartService {
  getCarts(token) {
    return apiRequest({
      method: 'GET',
      url: apiUrl('/carrinhos'),
      headers: buildAuthHeaders(token),
      failOnStatusCode: false,
    });
  }

  getCartById(cartId, token) {
    return apiRequest({
      method: 'GET',
      url: apiUrl(`/carrinhos/${cartId}`),
      headers: buildAuthHeaders(token),
      failOnStatusCode: false,
    });
  }

  createCart(productId, token, quantity = 1) {
    return apiRequest({
      method: 'POST',
      url: apiUrl('/carrinhos'),
      headers: buildAuthHeaders(token),
      body: buildCartPayload(productId, quantity),
      failOnStatusCode: false,
    });
  }

  cancelPurchase(token) {
    return apiRequest({
      method: 'DELETE',
      url: apiUrl('/carrinhos/cancelar-compra'),
      headers: buildAuthHeaders(token),
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
    expect(response.body.message).to.eq(API_MESSAGES.successfulCreation);
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  }

  assertSuccessfulCancellation(response) {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(API_MESSAGES.cartCancelled);
  }

  assertCartNotFound(response) {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq(API_MESSAGES.cartNotFound);
  }

  assertCartNotFoundEventually(cartId, token, retries = 8) {
    return this.getCartById(cartId, token).then((response) => {
      if (response.status === 400) {
        this.assertCartNotFound(response);
        return;
      }

      if (retries > 0) {
        return this.assertCartNotFoundEventually(cartId, token, retries - 1);
      }

      this.assertCartNotFound(response);
    });
  }
}

export default new CartService();
