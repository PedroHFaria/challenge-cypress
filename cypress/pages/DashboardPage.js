class DashboardPage {
  homePath = '/home';
  shoppingListPath = '/minhaListaDeProdutos';

  homeElements = {
    searchInput: '[data-testid="pesquisar"]',
    searchButton: '[data-testid="botaoPesquisar"]',
    addToListButton: '[data-testid="adicionarNaLista"]',
    productTitle: '.card-title',
    shoppingListNavLink: '[data-testid="lista-de-compras"]',
  };

  shoppingListElements = {
    pageTitle: 'h1',
    productName: '[data-testid="shopping-cart-product-name"]',
    productQuantity: '[data-testid="shopping-cart-product-quantity"]',
    homeButton: '[data-testid="paginaInicial"]',
    increaseQuantityButton: '[data-testid="product-increase-quantity"]',
  };

  assertHomeLoaded() {
    cy.url().should('include', this.homePath);
    cy.contains('h1', 'Serverest Store').should('be.visible');
    cy.contains('h4', 'Produtos').should('be.visible');
    return this;
  }

  waitForProducts() {
    cy.get(this.homeElements.productTitle, { timeout: 10000 }).should('have.length.at.least', 1);
    return this;
  }

  addFirstProductToList() {
    cy.get(this.homeElements.productTitle)
      .first()
      .invoke('text')
      .then((productName) => {
        cy.wrap(productName.trim()).as('selectedProduct');
        cy.get(this.homeElements.addToListButton).first().click();
      });

    return this;
  }

  openShoppingListViaNavbar() {
    cy.get(this.homeElements.shoppingListNavLink).click();
    return this;
  }

  goToHome() {
    cy.get(this.shoppingListElements.homeButton).click();
    return this;
  }

  assertShoppingListLoaded() {
    cy.url().should('include', this.shoppingListPath);
    cy.get(this.shoppingListElements.pageTitle).should('contain.text', 'Lista de Compras');
    return this;
  }

  assertProductListed(productName) {
    cy.get(this.shoppingListElements.productName).should('contain.text', productName);
    return this;
  }

  assertProductQuantity(quantity) {
    cy.get(this.shoppingListElements.productQuantity).should('contain.text', quantity);
    return this;
  }

  increaseFirstProductQuantity() {
    cy.get(this.shoppingListElements.increaseQuantityButton).first().click();
    return this;
  }
}

export default new DashboardPage();
