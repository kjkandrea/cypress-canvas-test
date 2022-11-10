type VertexXY = [number, number];

export default class ColorfulShapeGraphic {
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public drawGreenRect() {
    const ctx = this.canvas.getContext('2d')!;
    ctx.fillStyle = 'green';
    ctx.fillRect(...this.getCenterPosition([150, 100]), 150, 100);
  }

  private getCenterPosition(targetXY: VertexXY): VertexXY {
    const {width, height} = this.canvas;
    const [x, y] = targetXY;
    return [width / 2 - x / 2, height / 2 - y / 2];
  }
}
