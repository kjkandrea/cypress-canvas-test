import './style.css';
import ColorfulShapeGraphic from './graphic/ColorfulShapeGraphic';

const rootElement = document.querySelector<HTMLDivElement>('#app')!;

rootElement.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      
      
    </a>
    <h1>Vite + TypeScript</h1>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const canvasElement = document.createElement('canvas');
rootElement.append(canvasElement);

const colorfulShapeGraphic = new ColorfulShapeGraphic(canvasElement);
colorfulShapeGraphic.drawGreenRect();
colorfulShapeGraphic.drawRedCircle();
colorfulShapeGraphic.drawBlueTriangle();
