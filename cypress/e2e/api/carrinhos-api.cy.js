import CartsApi from '../../support/api/CartsApi';

describe('API - Carts', () => {
  context('GET scenarios', () => {
    it('should list carts successfully', () => {
      CartsApi.getCarts().then((response) => {
        CartsApi.assertSuccessfulList(response);
      });
    });
  });

  context('POST scenarios', () => {
    it('should create a cart successfully', () => {
      CartsApi.authenticateNewUser().then(({ token }) => {
        CartsApi.getFirstProductId().then((productId) => {
          CartsApi.createCart(productId, token).then((response) => {
            CartsApi.assertSuccessfulCreation(response);
          });
        });
      });
    });
  });

  context('DELETE scenarios', () => {
    it('should cancel a cart successfully', () => {
      CartsApi.authenticateNewUser().then(({ token }) => {
        CartsApi.getFirstProductId().then((productId) => {
          CartsApi.createCart(productId, token).then((createResponse) => {
            CartsApi.assertSuccessfulCreation(createResponse);

            const cartId = createResponse.body._id;

            CartsApi.cancelPurchase(token).then((cancelResponse) => {
              CartsApi.assertSuccessfulCancellation(cancelResponse);
            });

            CartsApi.getCartById(cartId, token).then((getResponse) => {
              CartsApi.assertCartNotFound(getResponse);
            });
          });
        });
      });
    });
  });
});
