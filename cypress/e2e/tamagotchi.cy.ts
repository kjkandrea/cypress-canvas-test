export {};

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
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
    cy.tick(4050);
    cy.get('.poop').should('be.visible');
    cy.get('.Margo').should('have.class', 'has-pooped');
    cy.clock().then(clock => {
      clock.restore();
    });
  });

  it('Poop 은 4초 마다 생성되고 Clean Poop 버튼을 누르면 Poop 이 지워진다.', () => {
    cy.clock();
    cy.contains('Start').click();

    const makeAndClean = () => {
      cy.tick(4050);
      cy.contains('Clean Poop').click();
      cy.get('.poop').should('be.hidden');
    };

    makeAndClean();
    makeAndClean();
    makeAndClean();
  });
});
