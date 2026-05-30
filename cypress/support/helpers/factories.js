const cleanupQueue = [];

export function scheduleCleanup(task) {
  cleanupQueue.push(task);
}

export function runCleanups() {
  if (cleanupQueue.length === 0) {
    return cy.wrap(null);
  }

  const tasks = cleanupQueue.splice(0).reverse();

  return cy.wrap(tasks).each((task) => task());
}
