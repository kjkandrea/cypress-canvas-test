import './assets/scss/style.scss';
declare module '*.mp3';

import cleanPoopSound from './assets/sounds/clean-poop.mp3';
import poopingSound from './assets/sounds/pooping.mp3';

const tamagotchiTemplate = `
  <div class='tamagotchi__inner'>
      <div class='screen'>
        <div class='screen__inner'>
          <div class='Margo'></div>
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
cleanPoopButton.textContent = 'Clean poop';
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
  private readonly Margo: HTMLDivElement;
  private readonly poopArea: HTMLDivElement;

  constructor(Margo: HTMLDivElement, poopArea: HTMLDivElement) {
    this.Margo = Margo;
    this.poopArea = poopArea;
  }

  make() {
    if (!this.Margo.classList.contains('has-pooped')) {
      this.poopArea.classList.add('is-visible');
      this.Margo.classList.add('has-pooped');
      sound.pooping.play().then(() => {
        this.poopArea.classList.add('is-visible');
        this.Margo.classList.add('has-pooped');
        elem.cleanPoopButton.style.display = 'block';
      });
    }
  }
  hide() {
    this.poopArea.classList.remove('is-visible');
    this.Margo.classList.remove('has-pooped');
  }
  clean() {
    if (this.Margo.classList.contains('has-pooped')) {
      sound.cleanPoop.play().then(() => {
        this.hide();
      });
    }
  }
}

const init = () => {
  elem.startButton.remove();
  elem.root.append(elem.tamagotchi, elem.cleanPoopButton);

  const Margo = elem.root.querySelector('.Margo') as HTMLDivElement;
  const poopArea = elem.root.querySelector('.poop') as HTMLDivElement;
  const pooper = new Pooper(Margo, poopArea);
  elem.cleanPoopButton.addEventListener('click', () => pooper.clean());
  setInterval(() => pooper.make(), 4000);
};

elem.startButton.addEventListener('click', () => {
  init();
});
