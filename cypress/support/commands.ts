import {ACTION_DURATION} from '../../src/const';

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test-id=${testId}]`)
})

Cypress.Commands.add('recursionLoop', (fn: (times: number) => boolean, times: number = 0) => {
  cy.then(() => {
    const result = fn(++times);
    if (result !== false) {
      cy.recursionLoop(fn, times);
    }
  });
});

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

Cypress.Commands.add('nextTick', () => {
  return cy
    .clock()
    .tick(ACTION_DURATION)
    .root()
})

Cypress.Commands.add('getPoop', () => {
  return cy
    .getByTestId('poop')
})

Cypress.Commands.add('getMeal', () => {
  return cy
    .getByTestId('meal')
})

Cypress.Commands.add('getKarenin', () => {
  return cy
    .getByTestId('karenin')
})

Cypress.Commands.add('getScreen', () => {
  return cy
    .getByTestId('screen')
})

Cypress.Commands.add('cleanPoop', () => {
  return cy
    .nextTick()
    .root()
    .contains('Clean Poop')
    .click()
    .root()
})

Cypress.Commands.add('hasPooped', (pooped: boolean) => {
  return cy.getPoop()
    .should(pooped ? 'be.visible' : 'be.hidden')
    .getKarenin()
    .should(pooped ? 'have.class': 'not.have.class', 'has-pooped');
})

Cypress.Commands.add('giveMeal', () => {
  return cy
    .contains('Give a Meal')
    .click()
})

Cypress.Commands.add('hasEatMeal', (eat: boolean) => {
  return cy
    .getMeal()
    .should(eat ? 'be.hidden' : 'be.visible')
    .getKarenin()
    .should(eat ? 'not.have.class' : 'have.class', 'has-mealed');
})

Cypress.Commands.add('kareninCycle', (i: number) => {
  return cy
    .nextTick()
    .cleanPoop()
    .contains(`Clean Count : ${i}`)
    .giveMeal()
    .getMeal()
    .hasEatMeal(false)
    .nextTick()
    .hasEatMeal(true)
    .nextTick()
    .hasPooped(true)
})

