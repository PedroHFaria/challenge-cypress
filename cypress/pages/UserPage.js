class UserPage {
  path = '/admin/cadastrarusuarios';

  elements = {
    nameInput: '[data-testid="nome"]',
    emailInput: '[data-testid="email"]',
    passwordInput: '[data-testid="password"]',
    adminCheckbox: '[data-testid="checkbox"]',
    submitButton: '[data-testid="cadastrarUsuario"]',
  };

  assertPageLoaded() {
    cy.url().should('include', this.path);
    cy.get('h1').should('contain.text', 'Cadastro de usuários');
    return this;
  }

  fillName(name) {
    cy.get(this.elements.nameInput).clear().type(name);
    return this;
  }

  fillEmail(email) {
    cy.get(this.elements.emailInput).clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get(this.elements.passwordInput).clear().type(password);
    return this;
  }

  setAdmin(isAdmin) {
    const checkbox = cy.get(this.elements.adminCheckbox);

    if (isAdmin) {
      checkbox.check();
    } else {
      checkbox.uncheck();
    }

    return this;
  }

  submit() {
    cy.get(this.elements.submitButton).click();
    return this;
  }

  register(user) {
    this.fillName(user.name);
    this.fillEmail(user.email);
    this.fillPassword(user.password);
    this.setAdmin(user.isAdmin);
    this.submit();
    return this;
  }

  assertUserListRedirect() {
    cy.url().should('include', '/admin/listarusuarios');
    cy.get('h1').should('contain.text', 'Lista dos usuários');
  }

  assertUserListed(user) {
    cy.contains('td', user.email).should('be.visible');
    cy.contains('td', user.name).should('be.visible');
  }

  assertUserAdminStatus(user, isAdmin) {
    cy.contains('tr', user.email).within(() => {
      cy.contains('td', isAdmin ? 'true' : 'false').should('be.visible');
    });
  }

  assertRequiredFieldErrors() {
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
    cy.url().should('include', this.path);
  }
}

export default new UserPage();
