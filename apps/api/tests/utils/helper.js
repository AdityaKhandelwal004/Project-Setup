import Container from 'typedi';

/**
 * Gets the db credentails from container and return them as object
 * @returns {TestPostgreSqlContainer}
 */
export function getDbCredentials(container) {
  return {
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  };
}

/**
 * Mocks console.log to print nothing
 * @param {'log'|'warn'|'error'|'info'} statement The statement to mock
 * @returns {jest.SpyInstance}
 */
export function mockConsoleLog(statement = 'log') {
  return jest.spyOn(console, statement).mockImplementation(() => {});
}

/**
 * Sets the database in the container
 * @param {Database} database
 */
export function setContainer(database) {
  Container.set('DbTransactions', database);
}

/**
 * restores console.log method
 * @param {jest.SpyInstance} mock
 */
export function restoreConsoleLog(mock) {
  mock.mockRestore();
}

/**
 * @typedef {Object} TestPostgreSqlContainer
 * @property {string} host
 * @property {number} port
 * @property {string} database
 * @property {string} user
 * @property {string} password
*/
