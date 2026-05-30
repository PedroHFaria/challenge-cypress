import ProductsApi from '../../support/api/ProductsApi';

describe('API - Products', () => {
  context('Success scenarios', () => {
    it('should create a product successfully with random data', () => {
      cy.fixture('users').then(({ validUser }) => {
        ProductsApi.authenticate(validUser).then(({ body }) => {
          cy.generateRandomProduct().then((product) => {
            ProductsApi.createProduct(product, body.authorization).then((response) => {
              ProductsApi.assertSuccessfulCreation(response);
            });
          });
        });
      });
    });
  });

  context('Creation failure scenarios', () => {
    it('should return 401 when access token is missing', () => {
      cy.generateRandomProduct().then((product) => {
        ProductsApi.createProduct(product).then((response) => {
          ProductsApi.assertMissingTokenError(response);
        });
      });
    });

    it('should return 400 when required fields are missing', () => {
      cy.fixture('users').then(({ validUser }) => {
        ProductsApi.authenticate(validUser).then(({ body }) => {
          ProductsApi.createProductWithPayload({}, body.authorization).then((response) => {
            ProductsApi.assertRequiredFieldsError(response);
          });
        });
      });
    });
  });
});
