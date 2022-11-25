import './assets/scss/style.scss';
declare module '*.mp3';

import cleanPoopSound from './assets/sounds/clean-poop.mp3';
import poopingSound from './assets/sounds/pooping.mp3';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div class='tamagotchi'>
    <button class='start' type='button'>Start</button>
    <div class='tamagotchi__inner'>
      <div class='screen'>
        <div class='screen__inner'>
          <div class='Margo'></div>
          <div class='poop'></div>
        </div>
      </div>
    </div>
    <button class='clean-poop' type='button'>Clean Poop</button>
  </div>
`;

const elem = {
  Margo: document.querySelector('.Margo') as HTMLDivElement,
  poopArea: document.querySelector('.poop') as HTMLDivElement,
  startButton: document.querySelector('.start') as HTMLButtonElement,
  cleanPoopButton: document.querySelector('.clean-poop') as HTMLButtonElement,
};

const sound = {
  cleanPoop: new Audio(cleanPoopSound),
  pooping: new Audio(poopingSound),
};

const poop = {
  cleaned: 0,
  make() {
    if (!elem.Margo.classList.contains('has-pooped')) {
      elem.poopArea.classList.add('is-visible');
      elem.Margo.classList.add('has-pooped');
      sound.pooping.play().then(() => {
        elem.poopArea.classList.add('is-visible');
        elem.Margo.classList.add('has-pooped');
        elem.cleanPoopButton.style.display = 'block';
      });
    }
  },
  hide() {
    elem.poopArea.classList.remove('is-visible');
    elem.Margo.classList.remove('has-pooped');
  },
  clean() {
    if (elem.Margo.classList.contains('has-pooped')) {
      sound.cleanPoop.play().then(() => {
        poop.hide();
        poop.cleaned++;
      });
    }
  },
};

const init = () => {
  elem.cleanPoopButton.addEventListener('click', poop.clean);
  setInterval(poop.make, 4000);
};

elem.startButton.addEventListener('click', () => {
  init();
  elem.startButton.remove();
});
