class ShoppingListPage {
  path = '/minhaListaDeProdutos';

  elements = {
    pageTitle: 'h1',
    emptyMessage: '[data-testid="shopping-cart-empty-message"]',
    productName: '[data-testid="shopping-cart-product-name"]',
    productQuantity: '[data-testid="shopping-cart-product-quantity"]',
    clearListButton: '[data-testid="limparLista"]',
    homeButton: '[data-testid="paginaInicial"]',
    increaseQuantityButton: '[data-testid="product-increase-quantity"]',
  };

  assertPageLoaded() {
    cy.url().should('include', this.path);
    cy.get(this.elements.pageTitle).should('contain.text', 'Lista de Compras');
    return this;
  }

  assertEmptyList() {
    cy.get(this.elements.emptyMessage)
      .should('be.visible')
      .and('contain.text', 'Seu carrinho está vazio');
    return this;
  }

  assertProductListed(productName) {
    cy.get(this.elements.productName).should('contain.text', productName);
    return this;
  }

  assertProductQuantity(quantity) {
    cy.get(this.elements.productQuantity).should('contain.text', quantity);
    return this;
  }

  clearList() {
    cy.get(this.elements.clearListButton).click();
    return this;
  }

  increaseFirstProductQuantity() {
    cy.get(this.elements.increaseQuantityButton).first().click();
    return this;
  }

  goToHome() {
    cy.get(this.elements.homeButton).click();
    return this;
  }
}

export default new ShoppingListPage();
