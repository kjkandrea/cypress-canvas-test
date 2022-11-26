import './assets/scss/style.scss';

declare module '*.mp3';
import cleanPoopSound from './assets/sounds/clean-poop.mp3';
import poopingSound from './assets/sounds/pooping.mp3';

import {ACTION_DURATION} from './const';

const tamagotchiTemplate = `
  <p>Clean Count : <span class="clean-count">0</span></p> 
  <div class='tamagotchi__inner'>
    <div class='screen'>
      <div class='screen__inner' data-test-id='screen'>
        <div class='Karenin'></div>
        <div class='meal'></div>
        <div class='poop'></div>
      </div>
    </div>
  </div>
`;

const root = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
const tamagotchi = document.createElement('div');
tamagotchi.classList.add('tamagotchi');
tamagotchi.innerHTML = tamagotchiTemplate;
const startButton = document.createElement('button');
startButton.type = 'button';
startButton.classList.add('start');
startButton.textContent = 'Start';
root.append(startButton);
const giveMealButton = document.createElement('button');
giveMealButton.type = 'button';
giveMealButton.classList.add('give-meal');
giveMealButton.textContent = 'Give a Meal';
const cleanPoopButton = document.createElement('button');
cleanPoopButton.type = 'button';
cleanPoopButton.classList.add('clean-poop');
cleanPoopButton.textContent = 'Clean Poop';

const elem = {
  root,
  tamagotchi,
  startButton,
  cleanPoopButton,
  giveMealButton,
};

const sound = {
  on: new Audio(poopingSound),
  off: new Audio(cleanPoopSound),
};

class KareninLife {
  private readonly karenin: HTMLDivElement;
  private readonly poop: HTMLDivElement;
  private readonly meal: HTMLDivElement;
  private readonly cleanCount: HTMLSpanElement;

  constructor(
    Karenin: HTMLDivElement,
    poop: HTMLDivElement,
    meal: HTMLDivElement,
    cleanCount: HTMLSpanElement
  ) {
    this.karenin = Karenin;
    this.poop = poop;
    this.meal = meal;
    this.cleanCount = cleanCount;
  }

  giveMeal() {
    if (
      !this.karenin.classList.contains('has-pooped') &&
      !this.karenin.classList.contains('has-mealed')
    ) {
      sound.on.play().then(() => {
        this.meal.classList.add('is-visible');
        this.karenin.classList.add('has-mealed');
        elem.giveMealButton.disabled = true;
        setTimeout(() => this.eatMeal(), ACTION_DURATION);
      });
    }
  }

  eatMeal() {
    if (this.karenin.classList.contains('has-mealed')) {
      sound.off.play().then(() => {
        this.hideMeal();
        setTimeout(() => this.pooping(), ACTION_DURATION);
      });
    }
  }

  hideMeal() {
    this.meal.classList.remove('is-visible');
    this.karenin.classList.remove('has-mealed');
  }

  pooping() {
    if (!this.karenin.classList.contains('has-pooped')) {
      this.poop.classList.add('is-visible');
      this.karenin.classList.add('has-pooped');
      sound.on.play().then(() => {
        this.poop.classList.add('is-visible');
        this.karenin.classList.add('has-pooped');
        elem.cleanPoopButton.disabled = false;
      });
    }
  }

  cleanPoop() {
    if (this.karenin.classList.contains('has-pooped')) {
      sound.off.play().then(() => {
        this.hidePoop();
        elem.giveMealButton.disabled = false;
        elem.cleanPoopButton.disabled = true;
        this.cleanCount.textContent = String(
          Number(this.cleanCount.textContent) + 1
        );
      });
    }
  }

  hidePoop() {
    this.poop.classList.remove('is-visible');
    this.karenin.classList.remove('has-pooped');
  }
}

const init = () => {
  elem.startButton.remove();
  elem.root.append(elem.tamagotchi, elem.giveMealButton, elem.cleanPoopButton);

  const Karenin = elem.root.querySelector('.Karenin') as HTMLDivElement;
  const poop = elem.root.querySelector('.poop') as HTMLDivElement;
  const meal = elem.root.querySelector('.meal') as HTMLDivElement;
  const cleanCount = document.querySelector('.clean-count') as HTMLSpanElement;
  const keraninLife = new KareninLife(Karenin, poop, meal, cleanCount);
  elem.giveMealButton.addEventListener('click', () => keraninLife.giveMeal());
  elem.cleanPoopButton.addEventListener('click', () => keraninLife.cleanPoop());
  elem.giveMealButton.disabled = true;
  elem.cleanPoopButton.disabled = true;
  setTimeout(() => keraninLife.pooping(), ACTION_DURATION);
};

elem.startButton.addEventListener('click', () => {
  init();
});
