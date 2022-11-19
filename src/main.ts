import './style.css';
import ColorfulShapeGraphic from './graphic/ColorfulShapeGraphic';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div>
    <h1>Cypress, 테스트를 부탁해! 🧚</h1>
    <canvas></canvas>
    <div>
      <button data-event='draw-green-rect'>초록 사각형</button>
      <button data-event='draw-red-circle'>빨간 동그라미</button>
      <button data-event='draw-blue-triangle'>파란 삼각형</button>
    </div>
  </div>
`;

const canvasElement = rootElement.querySelector('canvas')!;

const colorfulShapeGraphic = new ColorfulShapeGraphic(canvasElement);
colorfulShapeGraphic.drawGreenRect();
colorfulShapeGraphic.drawRedCircle();
colorfulShapeGraphic.drawBlueTriangle();
