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

  public drawRedCircle() {
    const ctx = this.canvas.getContext('2d')!;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(...this.getCenterPosition([0, 0]), 60, 0, 2 * Math.PI);
    ctx.fill();
  }

  public drawBlueTriangle() {
    const ctx = this.canvas.getContext('2d')!;

    // 치수는 입력해보면서 어림 짐작으로 한거임. 공식 X
    const [x, y] = this.getCenterPosition([0, -120]);
    const height = 140 * Math.cos(Math.PI / 6);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(x - 70, y);
    ctx.lineTo(x + 70, y);
    ctx.lineTo(x, y - height);
    ctx.closePath();
    ctx.fill();
  }

  public cleanUp() {
    const ctx = this.canvas.getContext('2d')!;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.beginPath();
  }

  private getCenterPosition(targetXY: VertexXY): VertexXY {
    const {width, height} = this.canvas;
    const [x, y] = targetXY;
    return [width / 2 - x / 2, height / 2 - y / 2];
  }
}
