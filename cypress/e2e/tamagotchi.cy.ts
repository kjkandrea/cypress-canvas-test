import {ACTION_DURATION} from '../../src/const';

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('http://localhost:5173');
  });

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy.contains('Start').click();
    // TODO: 이미지 스냅샷 테스트 해보기

    cy.get('button').contains('Clean Poop');
  });

  it(`Start 이후 약 ${ACTION_DURATION / 1000}초 후 Poop 이 생성된다.`, () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(ACTION_DURATION);
    cy.get('.poop').should('be.visible');
    cy.get('.Karenin').should('have.class', 'has-pooped');
    cy.clock().then(clock => {
      clock.restore();
    });
  });

  it(`Poop 은 ${
    ACTION_DURATION / 1000
  }초 마다 생성되고 Clean Poop 버튼을 누르면 Poop 이 지워진다.`, () => {
    cy.clock();
    cy.contains('Start').click();

    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.get('.poop').should('be.hidden');
  });

  it(`Poop 을 치운 후 ${
    ACTION_DURATION / 1000
  }초 이후 Give a Meal 버튼이 활성화 된다.`, () => {
    cy.clock();
    cy.contains('Start').click();

    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.tick(ACTION_DURATION);
    cy.contains('Give a Meal').should('be.enabled');
  });

  it('생성된 Poop 을 치울 때 마다 Clean Count 가 증가한다.', () => {
    cy.clock();
    cy.contains('Start').click();

    const makeAndClean = () => {
      cy.tick(ACTION_DURATION);
      cy.contains('Clean Poop').click();
      cy.tick(ACTION_DURATION);
      cy.contains('Give a Meal').click();
      cy.tick(ACTION_DURATION);
    };

    makeAndClean();
    cy.contains('Clean Count : 1');
    // TODO: 재귀 호출 가능하게 테스트 수정
    // makeAndClean();
    // cy.contains('Clean Count : 2');

    // const testRange = Array.from({length: 2}, (_, i) => i + 1);
    //
    // cy.wrap(testRange).each(i => {
    //   makeAndClean();
    //   cy.contains(`Clean Count : ${i}`);
    // });
  });
});
