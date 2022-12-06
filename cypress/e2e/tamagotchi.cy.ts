import {ACTION_DURATION} from '../../src/const';

describe('다마고찌', () => {
  beforeEach(() => {
    cy.viewport('iphone-x').visit('http://localhost:5173');
  });

  const runSnapshotTest = false;

  it('Start 버튼을 클릭하면 다마고찌가 렌더링된다.', () => {
    cy
      .contains('Start')
      .click()
      .getScreen()
      .should('be.visible')
      .get('button')
      .contains('Give a Meal')
      .get('button')
      .contains('Clean Poop');

    runSnapshotTest &&
      cy.getKarenin().toMatchImageSnapshot();
  });

  describe(`Start 이후 약 ${ACTION_DURATION / 1000}초 후`, () => {
    beforeEach(() => {
      cy.tamagotchiStart().nextTick()
    });

    it(`Poop 이 생성된다.`, () => {
      cy.getPoop()
        .hasPooped(true)

      runSnapshotTest && cy.getPoop().toMatchImageSnapshot();
    });

    it('Clean Poop 버튼을 누르면 Poop 이 지워진다.', () => {
      cy
        .contains('Clean Poop')
        .click()
        .hasPooped(false)
    });

    it('생성된 Poop 을 치울 때 마다 Clean Count 가 증가한다.', () => {
      cy
        .cleanPoop()
        .contains('Clean Count : 1');
    });
  })

  describe(`Start 이후 첫번째 Poop을 치움`, () => {
    beforeEach(() => {
      cy.tamagotchiStart().cleanPoop()
    });

    it(`Give a Meal 버튼이 활성화 된다.`, () => {
      cy
        .contains('Give a Meal')
        .should('be.enabled');
    });

    it('활성화 된 Give a Meal 버튼을 클릭하면 Meal 이 나타난다.', () => {
      cy
        .contains('Give a Meal')
        .click()
        .getMeal()
        .should('be.visible');

      runSnapshotTest && cy.get('[data-test-id="meal"]').toMatchImageSnapshot();
    });

    it('Meal 이 나타나면 4초 뒤 karenin 이 먹는다.', () => {
      cy
        .giveMeal()
        .nextTick()
        .hasEatMeal(true)
    });

    it('Meal 을 먹으면 Poop 이 나타난다.', () => {
      cy
        .giveMeal()
        .nextTick()
        .getMeal()
        .hasEatMeal(true)
        .nextTick()
        .getPoop()
        .hasPooped(true)
    });
  });

  describe('루프 테스트', () => {
    beforeEach(() => {
      cy.tamagotchiStart()
    });

    it('위와 같이 Karenin 은 영원히 순환하는 시간을 산다.', () => {
      cy.recursionLoop((times) => {
        cy.kareninCycle(times);
        return 10 > times // if Infinity, cypress dies.. 😔
      })

    });
  });
});
