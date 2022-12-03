import {ACTION_DURATION} from '../../src/const';
// eslint-disable-next-line node/no-unpublished-import
import 'cypress-plugin-snapshots/commands';

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('http://localhost:5173');
  });

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy.contains('Start').click();
    cy.get('[data-test-id="screen"]')
      .should('be.visible')
      .get('button')
      .contains('Give a Meal')
      .parent()
      .contains('Clean Poop');

    cy.get('[data-test-id="karenin"]').toMatchImageSnapshot({
      imageConfig: {
        threshold: 0.001,
      },
    });
  });

  it(`Start 이후 약 ${ACTION_DURATION / 1000}초 후 Poop 이 생성된다.`, () => {
    cy.clock();
    cy.contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .get('[data-test-id="poop"]')
      .should('be.visible')
      .parent()
      .get('[data-test-id="karenin"]')
      .should('have.class', 'has-pooped');
  });

  it(`Poop 은 ${
    ACTION_DURATION / 1000
  }초 마다 생성되고 Clean Poop 버튼을 누르면 Poop 이 지워진다.`, () => {
    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);
    cy.contains('Clean Poop')
      .click()
      .get('[data-test-id="poop"]')
      .should('be.hidden');
  });

  it('생성된 Poop 을 치울 때 마다 Clean Count 가 증가한다.', () => {
    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);
    cy.contains('Clean Poop').click().parent().contains('Clean Count : 1');
  });

  it(`Poop 을 치운 후 ${
    ACTION_DURATION / 1000
  }초 이후 Give a Meal 버튼이 활성화 된다.`, () => {
    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);
    cy.contains('Clean Poop')
      .click()
      .parent()
      .contains('Give a Meal')
      .should('be.enabled');
  });

  it('활성화 된 Give a Meal 버튼을 클릭하면 Meal 이 나타난다.', () => {
    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);
    cy.contains('Clean Poop')
      .click()
      .parent()
      .contains('Give a Meal')
      .click()
      .get('[data-test-id="meal"]')
      .should('be.visible');
  });

  it('Meal 이 나타나면 4초 뒤 사라지고 Poop 이 나타난다.', () => {
    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);
    cy.contains('Clean Poop')
      .click()
      .parent()
      .contains('Give a Meal')
      .click()
      .get('[data-test-id="meal"]')
      .should('be.visible')
      .tick(ACTION_DURATION)
      .get('[data-test-id="meal"]')
      .should('be.hidden')
      .tick(ACTION_DURATION)
      .get('[data-test-id="poop"]')
      .should('be.visible');
  });

  it('위와 같이 Karenin 은 영원히 순환하는 시간을 산다.', () => {
    const howMany = range(1); // if Infinity, cypress dies.. 😔

    cy.clock();
    cy.contains('Start').click().tick(ACTION_DURATION);

    const kareninLife = (i: number) => {
      cy.contains('Clean Poop').click().parent().contains(`Clean Count : ${i}`);
      cy.contains('Give a Meal')
        .click()
        .get('[data-test-id="meal"]')
        .should('be.visible')
        .tick(ACTION_DURATION)
        .get('[data-test-id="meal"]')
        .should('be.hidden')
        .tick(ACTION_DURATION)
        .get('[data-test-id="poop"]')
        .should('be.visible');
    };

    function* range(stop: number) {
      let i = -1;
      while (++i < stop) yield i;
    }
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
