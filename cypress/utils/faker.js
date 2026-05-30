export function createRandomUser({ isAdmin = false } = {}) {
  const uniqueId = `${Date.now()}_${Cypress._.random(1000, 9999)}`;

  return {
    name: `Test User ${uniqueId}`,
    email: `user.${uniqueId}@test.com`,
    password: `Pass${uniqueId}!`,
    isAdmin,
  };
}

export function createRandomProduct() {
  const uniqueId = `${Date.now()}_${Cypress._.random(1000, 9999)}`;

  return {
    name: `Product ${uniqueId}`,
    price: Cypress._.random(1, 9999),
    description: `Description ${uniqueId}`,
    quantity: Cypress._.random(1, 100),
  };
}
