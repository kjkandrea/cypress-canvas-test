import {ACTION_DURATION} from '../../src/const';

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('http://localhost:5173');
  });

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy.contains('Start').click();
    // TODO: 이미지 스냅샷 테스트 해보기

    cy.get('[data-test-id="screen"]')
      .should('be.visible')
      .get('button')
      .contains('Give a Meal')
      .parent()
      .contains('Clean Poop');
  });

  it(`Start 이후 약 ${ACTION_DURATION / 1000}초 후 Poop 이 생성된다.`, () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(ACTION_DURATION);
    cy.get('[data-test-id="poop"]').should('be.visible');
    cy.get('[data-test-id="karenin"]').should('have.class', 'has-pooped');
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
    cy.get('[data-test-id="poop"]').should('be.hidden');
  });

  it('생성된 Poop 을 치울 때 마다 Clean Count 가 증가한다.', () => {
    cy.clock();
    cy.contains('Start').click();

    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.contains('Clean Count : 1');
  });

  it(`Poop 을 치운 후 ${
    ACTION_DURATION / 1000
  }초 이후 Give a Meal 버튼이 활성화 된다.`, () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.contains('Give a Meal').should('be.enabled');
  });

  it('활성화 된 Give a Meal 버튼을 클릭하면 Meal 이 나타난다.', () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.contains('Give a Meal').click();
    cy.get('[data-test-id="meal"]').should('be.visible');
  });

  it('Meal 이 나타나면 4초 뒤 사라지고 Poop 이 나타난다.', () => {
    cy.clock();
    cy.contains('Start').click();
    cy.tick(ACTION_DURATION);
    cy.contains('Clean Poop').click();
    cy.contains('Give a Meal').click();
    cy.get('[data-test-id="meal"]').should('be.visible');
    cy.tick(ACTION_DURATION);
    cy.get('[data-test-id="meal"]').should('be.hidden');
    cy.tick(ACTION_DURATION);
    cy.get('[data-test-id="poop"]').should('be.visible');
  });

  it('위와 같이 Karenin 은 영원히 순환하는 시간을 산다.', () => {
    cy.clock();
    cy.contains('Start').click();

    const kareninLife = (i: number) => {
      cy.tick(ACTION_DURATION);
      cy.contains('Clean Poop').click();
      cy.contains(`Clean Count : ${i}`);
      cy.contains('Give a Meal').click();
      cy.get('[data-test-id="meal"]').should('be.visible');
      cy.tick(ACTION_DURATION);
      cy.get('[data-test-id="meal"]').should('be.hidden');
      cy.tick(ACTION_DURATION);
      cy.get('[data-test-id="poop"]').should('be.visible');
    };

    const range = function* (stop: number) {
      let i = -1;
      while (++i < stop) yield i;
    };

    const howMany = range(1); // if Infinity, cypress dies.. 😔
    let looping = true;
    while (looping) {
      const {value, done} = howMany.next();
      if (done) {
        looping = false;
        break;
      }
      kareninLife(value + 1);
    }
  });
});
