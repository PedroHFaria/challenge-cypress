import CartService from '../../../services/CartService';

describe('API - Carts', () => {
  context('GET scenarios', () => {
    it('should list carts successfully', () => {
      CartService.getCarts().then((response) => {
        CartService.assertSuccessfulList(response);
      });
    });
  });

  context('POST scenarios', () => {
    it('should create a cart successfully', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ token: adminToken }) => {
        cy.createProductForTest(adminToken).then(({ productId }) => {
          cy.createUserForTest({ isAdmin: true }).then(({ token }) => {
            CartService.createCart(productId, token).then((response) => {
              CartService.assertSuccessfulCreation(response);
            });
          });
        });
      });
    });
  });

  context('DELETE scenarios', () => {
    it('should cancel a cart successfully', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ token: adminToken }) => {
        cy.createProductForTest(adminToken).then(({ productId }) => {
          cy.createUserForTest({ isAdmin: true }).then(({ token }) => {
            CartService.createCart(productId, token).then((createResponse) => {
              CartService.assertSuccessfulCreation(createResponse);

              const cartId = createResponse.body._id;

              CartService.cancelPurchase(token).then((cancelResponse) => {
                CartService.assertSuccessfulCancellation(cancelResponse);
              });

              CartService.getCartById(cartId, token).then((getResponse) => {
                CartService.assertCartNotFound(getResponse);
              });
            });
          });
        });
      });
    });
  });
});
