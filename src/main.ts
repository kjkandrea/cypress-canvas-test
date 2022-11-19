import './style.css';
import ColorfulShapeGraphic from './graphic/ColorfulShapeGraphic';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div>
    <h1>Cypress, 테스트를 부탁해! 🧚</h1>
    <canvas></canvas>
    <div>
      <button type="button" data-event='draw-green-rect'>초록 사각형</button>
      <button type="button" data-event='draw-red-circle'>빨간 동그라미</button>
      <button type="button" data-event='draw-blue-triangle'>파란 삼각형</button>
    </div>
  </div>
`;

const canvasElement = rootElement.querySelector('canvas')!;

const colorfulShapeGraphic = new ColorfulShapeGraphic(canvasElement);
rootElement.addEventListener('click', ({target}) => {
  if (!isEventButtonElement(target)) return;
  const event = target.dataset.event;
  switch (event) {
    case 'draw-green-rect':
      colorfulShapeGraphic.cleanUp();
      colorfulShapeGraphic.drawGreenRect();
      break;
    case 'draw-red-circle':
      colorfulShapeGraphic.cleanUp();
      colorfulShapeGraphic.drawRedCircle();
      break;
    case 'draw-blue-triangle':
      colorfulShapeGraphic.cleanUp();
      colorfulShapeGraphic.drawBlueTriangle();
      break;
  }
});

interface EventButtonElement extends HTMLButtonElement {
  dataset: {
    event: string;
  };
}

function isEventButtonElement(
  eventTarget: EventTarget | null
): eventTarget is EventButtonElement {
  if (eventTarget === null) return false;
  const isButtonElement = eventTarget instanceof HTMLButtonElement;
  if (!isButtonElement) return false;
  return Boolean(eventTarget.dataset?.event);
}
