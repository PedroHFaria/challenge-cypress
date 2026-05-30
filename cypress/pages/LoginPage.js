class LoginPage {
  elements = {
    emailInput: '[data-testid="email"]',
    passwordInput: '[data-testid="senha"]',
    submitButton: '[data-testid="entrar"]',
    registerLink: '[data-testid="cadastrar"]',
  };

  visit() {
    cy.visit('/login');
    cy.get('h1').should('contain.text', 'Login');
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

  submit() {
    cy.get(this.elements.submitButton).click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  clickRegisterLink() {
    cy.get(this.elements.registerLink).click();
    return this;
  }

  assertSuccessfulLogin() {
    cy.url().should('include', '/admin/home');
    cy.contains('Bem Vindo').should('be.visible');
  }

  assertInvalidCredentialsError() {
    cy.contains('Email e/ou senha inválidos').should('be.visible');
    cy.url().should('include', '/login');
  }

  assertRequiredFieldErrors() {
    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
    cy.url().should('include', '/login');
  }

  assertRegisterPage() {
    cy.url().should('include', '/cadastrarusuarios');
  }
}

export default new LoginPage();
