// https://github.com/cypress-io/cypress-example-todomvc#cypress-intellisense
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test-id attribute.
     * @example cy.getByTestId('poop')
     */
    getByTestId(testId: string): Chainable<JQuery<Element>>
  }
}
