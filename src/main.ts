import './style.css'
import ColorfulRectGraphic from "./graphic/ColorfulRectGraphic";

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
`

const canvasElement = document.createElement('canvas');
rootElement.append(canvasElement)

new ColorfulRectGraphic(canvasElement);
