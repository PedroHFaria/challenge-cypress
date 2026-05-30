import DashboardPage from '../../../pages/DashboardPage';

describe('Frontend - Shopping List', () => {
  beforeEach(() => {
    cy.createUserForTest({ isAdmin: true }).then(({ token }) => {
      cy.createProductForTest(token);
    });

    cy.loginAsClient();
    DashboardPage.assertHomeLoaded();
    DashboardPage.waitForProducts();
  });

  context('Add products scenarios', () => {
    it('should add a product to the shopping list from home page', () => {
      DashboardPage.addFirstProductToList();

      DashboardPage.assertShoppingListLoaded();
      cy.get('@selectedProduct').then((productName) => {
        DashboardPage.assertProductListed(productName);
      });
    });

    it('should display added products when navigating via navbar', () => {
      DashboardPage.addFirstProductToList();
      DashboardPage.assertShoppingListLoaded();

      DashboardPage.goToHome();
      DashboardPage.assertHomeLoaded();
      DashboardPage.openShoppingListViaNavbar();

      DashboardPage.assertShoppingListLoaded();
      cy.get('@selectedProduct').then((productName) => {
        DashboardPage.assertProductListed(productName);
      });
    });

    it('should increase product quantity in the shopping list', () => {
      DashboardPage.addFirstProductToList();
      DashboardPage.assertShoppingListLoaded();
      DashboardPage.assertProductQuantity('Total: 1');

      DashboardPage.increaseFirstProductQuantity();
      DashboardPage.assertProductQuantity('Total: 2');
    });
  });
});
