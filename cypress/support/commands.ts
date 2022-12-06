Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test-id=${testId}]`)
})

/**
 * tamagotchi test commands
 */

Cypress.Commands.add('tamagotchiStart', () => {
  return cy
    .root()
    .contains('Start')
    .click()
})
