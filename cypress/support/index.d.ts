// https://github.com/cypress-io/cypress-example-todomvc#cypress-intellisense
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test-id attribute.
     * @example cy.getByTestId('poop')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLHtmlElement>>
    recursionLoop(fn: (times: number) => boolean, times?: number): void
    tamagotchiStart(): Chainable<JQuery<HTMLHtmlElement>>
    nextTick(): Chainable<JQuery<HTMLHtmlElement>>
    getPoop(): Chainable<JQuery<HTMLHtmlElement>>
    getMeal(): Chainable<JQuery<HTMLHtmlElement>>
    getKarenin(): Chainable<JQuery<HTMLHtmlElement>>
    getScreen(): Chainable<JQuery<HTMLHtmlElement>>
    cleanPoop(): Chainable<JQuery<HTMLHtmlElement>>
    hasPooped(pooped: boolean): Chainable<JQuery<HTMLHtmlElement>>
    giveMeal(): Chainable<JQuery<HTMLHtmlElement>>
    hasEatMeal(eat: boolean): Chainable<JQuery<HTMLHtmlElement>>
    kareninCycle(i: number): Chainable<JQuery<HTMLHtmlElement>>
  }
}
