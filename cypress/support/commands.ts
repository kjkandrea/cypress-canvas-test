import {ACTION_DURATION} from '../../src/const';

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test-id=${testId}]`)
})

/**
 * tamagotchi test commands
 */

Cypress.Commands.add('tamagotchiStart', () => {
  return cy
    .clock()
    .root()
    .contains('Start')
    .click()
})

Cypress.Commands.add('getPoop', () => {
  return cy
    .getByTestId('poop')
})

Cypress.Commands.add('getMeal', () => {
  return cy
    .getByTestId('meal')
})

Cypress.Commands.add('cleanPoop', () => {
  return cy
    .clock()
    .tick(ACTION_DURATION)
    .root()
    .contains('Clean Poop')
    .click()
    .root()
})

Cypress.Commands.add('cleanPoop', () => {
  return cy
    .clock()
    .tick(ACTION_DURATION)
    .root()
    .contains('Clean Poop')
    .click()
    .root()
})

Cypress.Commands.add('giveMeal', () => {
  return cy
    .contains('Give a Meal')
    .click()
})

