import './assets/scss/style.scss';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div class='tamagotchi'>
    <div class='tamagotchi__inner'>
      <div class='screen'>
        <div class='screen__inner'>
          <div class='Margo'></div>
          <div class='poop'></div>
        </div>
      </div>
    </div>
    <button class='clean-poop'>Clean Poop</button>
  </div>
`;

const Margo = document.querySelector('.Margo') as HTMLDivElement;
const poopArea = document.querySelector('.poop') as HTMLDivElement;
const cleanPoopButton = document.querySelector('.clean-poop') as HTMLDivElement;

const poop = {
  cleaned: 0,
  make() {
    if (!Margo.classList.contains('has-pooped')) {
      poopArea.classList.add('is-visible');
      Margo.classList.add('has-pooped');
    }
  },
  hide() {
    poopArea.classList.remove('is-visible');
    Margo.classList.remove('has-pooped');
  },
  clean() {
    if (Margo.classList.contains('has-pooped')) {
      poop.hide();
      poop.cleaned++;
    }
  },
};

setInterval(poop.make, 4000);

const init = () => {
  cleanPoopButton.addEventListener('click', poop.clean);
};

init();
