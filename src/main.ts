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
    <button class='clean-poop' type='button'>Clean Poop</button>
  </div>
`;

const elem = {
  Margo: document.querySelector('.Margo') as HTMLDivElement,
  poopArea: document.querySelector('.poop') as HTMLDivElement,
  cleanPoopButton: document.querySelector('.clean-poop') as HTMLDivElement,
};

const poop = {
  cleaned: 0,
  make() {
    if (!elem.Margo.classList.contains('has-pooped')) {
      elem.poopArea.classList.add('is-visible');
      elem.Margo.classList.add('has-pooped');
    }
  },
  hide() {
    elem.poopArea.classList.remove('is-visible');
    elem.Margo.classList.remove('has-pooped');
  },
  clean() {
    if (elem.Margo.classList.contains('has-pooped')) {
      poop.hide();
      poop.cleaned++;
    }
  },
};

setInterval(poop.make, 4000);

const init = () => {
  elem.cleanPoopButton.addEventListener('click', poop.clean);
};

init();
