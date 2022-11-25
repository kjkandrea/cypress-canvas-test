export {};

describe('다마고찌', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy.contains('Start').click();
    cy.get('[data-test-id="screen"]')
      .should('have.css', 'width')
      .and('eq', '128px');

    cy.get('[data-test-id="screen"]')
      .should('have.css', 'height')
      .and('eq', '128px');

    cy.get('button').contains('Clean Poop');
  });

  it('Start 이후 약 4초 후 Poop 이 생성된다.', () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(6050);
    cy.get('.poop').should('be.visible');
    cy.clock().then(clock => {
      clock.restore();
    });
  });
});
