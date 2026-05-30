export function createRandomUser({ isAdmin = false } = {}) {
  const uniqueId = `${Date.now()}_${Cypress._.random(1000, 9999)}`;

  return {
    name: `Test User ${uniqueId}`,
    email: `user.${uniqueId}@test.com`,
    password: `Pass${uniqueId}!`,
    isAdmin,
  };
}
