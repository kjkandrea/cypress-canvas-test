import {ACTION_DURATION} from '../../src/const';

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x').visit('http://localhost:5173');
  });

  const runSnapshotTest = false;

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy.contains('Start')
      .click()
      .root()
      .getByTestId('screen')
      .should('be.visible')
      .get('button')
      .contains('Give a Meal')
      .get('button')
      .contains('Clean Poop');

    runSnapshotTest &&
      cy.getByTestId('karenin').toMatchImageSnapshot();
  });

  it(`Start 이후 약 ${ACTION_DURATION / 1000}초 후 Poop 이 생성된다.`, () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .getByTestId('poop')
      .should('be.visible')
      .getByTestId('karenin')
      .should('have.class', 'has-pooped');

    runSnapshotTest && cy.get('[data-test-id="poop"]').toMatchImageSnapshot();
  });

  it('Clean Poop 버튼을 누르면 Poop 이 지워진다.', () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .root()
      .contains('Clean Poop')
      .click()
      .getByTestId('poop')
      .should('be.hidden');
  });

  it('생성된 Poop 을 치울 때 마다 Clean Count 가 증가한다.', () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .root()
      .contains('Clean Poop')
      .click()
      .root()
      .contains('Clean Count : 1');
  });

  it(`Poop 을 치운 후 ${
    ACTION_DURATION / 1000
  }초 이후 Give a Meal 버튼이 활성화 된다.`, () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .root()
      .contains('Clean Poop')
      .click()
      .root()
      .contains('Give a Meal')
      .should('be.enabled');
  });

  it('활성화 된 Give a Meal 버튼을 클릭하면 Meal 이 나타난다.', () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .root()
      .contains('Clean Poop')
      .click()
      .root()
      .contains('Give a Meal')
      .click()
      .getByTestId('meal')
      .should('be.visible');

    runSnapshotTest && cy.get('[data-test-id="meal"]').toMatchImageSnapshot();
  });

  it('Meal 이 나타나면 4초 뒤 사라지고 Poop 이 나타난다.', () => {
    cy.clock()
      .root()
      .contains('Start')
      .click()
      .tick(ACTION_DURATION)
      .root()
      .contains('Clean Poop')
      .click()
      .parent()
      .contains('Give a Meal')
      .click()
      .getByTestId('meal')
      .should('be.visible')
      .tick(ACTION_DURATION)
      .getByTestId('meal')
      .should('be.hidden')
      .tick(ACTION_DURATION)
      .getByTestId('poop')
      .should('be.visible');
  });

  it('위와 같이 Karenin 은 영원히 순환하는 시간을 산다.', () => {
    const howMany = range(1); // if Infinity, cypress dies.. 😔

    cy.clock().root().contains('Start').click().tick(ACTION_DURATION);

    const kareninLife = (i: number) => {
      cy.contains('Clean Poop')
        .click()
        .root()
        .contains(`Clean Count : ${i}`)
        .root()
        .contains('Give a Meal')
        .click()
        .getByTestId('meal')
        .should('be.visible')
        .tick(ACTION_DURATION)
        .getByTestId('meal')
        .should('be.hidden')
        .tick(ACTION_DURATION)
        .getByTestId('poop')
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

      if (typeof value === 'number') kareninLife(value + 1);
    }
  });
});
