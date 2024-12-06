export class Tile {
  private spriteSheet: HTMLImageElement;
  private dx: number;
  private dy: number;
  private sx: number;
  private sy: number;
  private width: number;
  private height: number;

  constructor(
    sx: number,
    sy: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.spriteSheet = image;
    this.dx = 0;
    this.dy = 0;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public setPosition(dx: number, dy: number): void {
    this.dx = dx;
    this.dy = dy;
  }

  // Retorna a imagem do tile
  public getImage(): HTMLImageElement {
    return this.spriteSheet;
  }

  public draw(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void {
    ctx.drawImage(
      this.spriteSheet,
      this.sx,
      this.sy,
      this.width,
      this.height,
      this.dx,
      this.dy,
      this.width,
      this.height
    );
  }
}
