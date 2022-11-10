import './style.css';
import ColorfulShapeGraphic from './graphic/ColorfulShapeGraphic';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div>
    <h1>Cypress, 테스트를 부탁해! 🧚</h1>
  </div>
`;

const canvasElement = document.createElement('canvas');
rootElement.append(canvasElement);

const colorfulShapeGraphic = new ColorfulShapeGraphic(canvasElement);
colorfulShapeGraphic.drawGreenRect();
colorfulShapeGraphic.drawRedCircle();
colorfulShapeGraphic.drawBlueTriangle();
