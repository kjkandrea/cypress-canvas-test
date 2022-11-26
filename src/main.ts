import './assets/scss/style.scss';
declare module '*.mp3';

import cleanPoopSound from './assets/sounds/clean-poop.mp3';
import poopingSound from './assets/sounds/pooping.mp3';

const tamagotchiTemplate = `
  <p>Clean Count : <span class="clean-count">0</span></p> 
  <div class='tamagotchi__inner'>
    <div class='screen'>
      <div class='screen__inner' data-test-id='screen'>
        <div class='Karenin'></div>
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
const cleanPoopButton = document.createElement('button');
cleanPoopButton.type = 'button';
cleanPoopButton.classList.add('clean-poop');
cleanPoopButton.textContent = 'Clean Poop';
root.append(startButton);

const elem = {
  root,
  tamagotchi,
  startButton,
  cleanPoopButton,
};

const sound = {
  cleanPoop: new Audio(cleanPoopSound),
  pooping: new Audio(poopingSound),
};

class Pooper {
  private readonly Karenin: HTMLDivElement;
  private readonly poopArea: HTMLDivElement;
  private readonly cleanCount: HTMLSpanElement;

  constructor(
    Karenin: HTMLDivElement,
    poopArea: HTMLDivElement,
    cleanCount: HTMLSpanElement
  ) {
    this.Karenin = Karenin;
    this.poopArea = poopArea;
    this.cleanCount = cleanCount;
  }

  make() {
    if (!this.Karenin.classList.contains('has-pooped')) {
      this.poopArea.classList.add('is-visible');
      this.Karenin.classList.add('has-pooped');
      sound.pooping.play().then(() => {
        this.poopArea.classList.add('is-visible');
        this.Karenin.classList.add('has-pooped');
        elem.cleanPoopButton.style.display = 'block';
      });
    }
  }
  hide() {
    this.poopArea.classList.remove('is-visible');
    this.Karenin.classList.remove('has-pooped');
  }
  clean() {
    if (this.Karenin.classList.contains('has-pooped')) {
      sound.cleanPoop.play().then(() => {
        this.hide();
      });
      this.cleanCount.textContent = String(
        Number(this.cleanCount.textContent) + 1
      );
    }
  }
}

const init = () => {
  elem.startButton.remove();
  elem.root.append(elem.tamagotchi, elem.cleanPoopButton);

  const Karenin = elem.root.querySelector('.Karenin') as HTMLDivElement;
  const poopArea = elem.root.querySelector('.poop') as HTMLDivElement;
  const cleanCount = document.querySelector('.clean-count') as HTMLSpanElement;
  const pooper = new Pooper(Karenin, poopArea, cleanCount);
  elem.cleanPoopButton.addEventListener('click', () => pooper.clean());
  setInterval(() => pooper.make(), 4000);
};

elem.startButton.addEventListener('click', () => {
  init();
});
