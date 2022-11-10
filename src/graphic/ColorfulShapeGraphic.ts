export default class ColorfulShapeGraphic {
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public drawGreenRect() {
    const ctx = this.canvas.getContext('2d')!;
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
    console.log(ctx);
  }
}
