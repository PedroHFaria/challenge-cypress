import ProductService from '../../../services/ProductService';

describe('API - Products', () => {
  context('Success scenarios', () => {
    it('should create a product successfully with random data', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ token }) => {
        cy.createProductForTest(token).then(({ productId }) => {
          ProductService.getProducts().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.produtos.some((item) => item._id === productId)).to.be.true;
          });
        });
      });
    });
  });

  context('Creation failure scenarios', () => {
    it('should return 401 when access token is missing', () => {
      cy.generateRandomProduct().then((product) => {
        ProductService.createProduct(product).then((response) => {
          ProductService.assertMissingTokenError(response);
        });
      });
    });

    it('should return 400 when required fields are missing', () => {
      cy.createUserForTest({ isAdmin: true }).then(({ token }) => {
        ProductService.createProductWithPayload({}, token).then((response) => {
          ProductService.assertRequiredFieldsError(response);
        });
      });
    });
  });
});
