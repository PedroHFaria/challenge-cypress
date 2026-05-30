class HomePage {
  path = '/home';

  elements = {
    searchInput: '[data-testid="pesquisar"]',
    searchButton: '[data-testid="botaoPesquisar"]',
    addToListButton: '[data-testid="adicionarNaLista"]',
    productTitle: '.card-title',
    shoppingCartButton: '[data-testid="shopping-cart-button"]',
    shoppingListNavLink: '[data-testid="lista-de-compras"]',
  };

  assertPageLoaded() {
    cy.url().should('include', this.path);
    cy.contains('h1', 'Serverest Store').should('be.visible');
    cy.contains('h4', 'Produtos').should('be.visible');
    return this;
  }

  waitForProducts() {
    cy.get(this.elements.productTitle, { timeout: 10000 }).should('have.length.at.least', 1);
    return this;
  }

  getFirstProductName() {
    return cy.get(this.elements.productTitle).first().invoke('text');
  }

  addFirstProductToList() {
    this.getFirstProductName().then((productName) => {
      cy.wrap(productName.trim()).as('selectedProduct');
      cy.get(this.elements.addToListButton).first().click();
    });
    return this;
  }

  openShoppingListViaNavbar() {
    cy.get(this.elements.shoppingListNavLink).click();
    return this;
  }

  openShoppingListViaCartButton() {
    cy.get(this.elements.shoppingCartButton).click();
    return this;
  }
}

export default new HomePage();
