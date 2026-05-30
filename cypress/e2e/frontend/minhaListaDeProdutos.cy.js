import HomePage from '../../support/pages/HomePage';
import ShoppingListPage from '../../support/pages/ShoppingListPage';

describe('Frontend - Shopping List', () => {
  beforeEach(() => {
    cy.loginAsClient();
    HomePage.assertPageLoaded();
    HomePage.waitForProducts();
  });

  context('Add products scenarios', () => {
    it('should add a product to the shopping list from home page', () => {
      HomePage.addFirstProductToList();

      ShoppingListPage.assertPageLoaded();
      cy.get('@selectedProduct').then((productName) => {
        ShoppingListPage.assertProductListed(productName);
      });
    });

    it('should display added products when navigating via navbar', () => {
      HomePage.addFirstProductToList();
      ShoppingListPage.assertPageLoaded();

      ShoppingListPage.goToHome();
      HomePage.assertPageLoaded();
      HomePage.openShoppingListViaNavbar();

      ShoppingListPage.assertPageLoaded();
      cy.get('@selectedProduct').then((productName) => {
        ShoppingListPage.assertProductListed(productName);
      });
    });

    it('should increase product quantity in the shopping list', () => {
      HomePage.addFirstProductToList();
      ShoppingListPage.assertPageLoaded();
      ShoppingListPage.assertProductQuantity('Total: 1');

      ShoppingListPage.increaseFirstProductQuantity();
      ShoppingListPage.assertProductQuantity('Total: 2');
    });
  });
});
