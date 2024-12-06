import { Tileset } from "./Tileset";

export class Layer {
  private id: number;
  private name: string;
  public data?: number[];
  private width: number;
  private height: number;
  public visible: boolean = false;
  private opacity: number;
  private type: string;
  private x: number = 0;
  private y: number = 0;
  private offsetx: number = 0;
  private offsety: number = 0;
  private layers?: Layer[];
  private parallaxx: number;
  private parallaxy: number;

  constructor({
    id,
    name,
    width = 0,
    height = 0,
    offsetx = 0,
    offsety = 0,
    opacity,
    parallaxx = 1,
    parallaxy = 1,
    type,
    visible,
    x,
    y,
    data,
    layers,
  }: ILayer) {
    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.opacity = opacity;
    this.type = type;
    this.x = x;
    this.y = y;
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.data = data;
    this.parallaxx = parallaxx;
    this.parallaxy = parallaxy;

    if (layers) {
      this.layers = layers.map((layer) => new Layer(layer));
    }
  }

  public mount(
    tileSets: Tileset[],
    mapWidth: number,
    mapHeight: number
  ): OffscreenCanvas {
    if (this.data) {
  
      const canvas = new OffscreenCanvas(mapWidth, mapHeight);
      const ctx = canvas.getContext("2d");
  
      if (!ctx) throw new Error("there is no context for this layer");
  
      for (let i = 0; i < this.data.length; i++) {
        const tileData = this.data[i];
        const currTileId = tileData & 0x3fffffff; // Extrai o ID do tile
  
        const isFlippedHorizontal = (tileData & 0x80000000) !== 0;
        const isFlippedVertical = (tileData & 0x40000000) !== 0;
        const isFlippedDiagonal = (tileData & 0x20000000) !== 0;
  
        if (currTileId === 0) continue; // Ignora tiles vazios
  
        const currentTileset = tileSets.find((tileset, i) => {
          const currTilesetRange = tileset.getFirstGid();
          const nextTilesetRange =
            i < tileSets.length - 1
              ? tileSets[i + 1].getFirstGid()
              : currTilesetRange + currTileId;
  
          return (
            currTileId >= currTilesetRange && currTileId <= nextTilesetRange
          );
        });
  
        if (!currentTileset) {
          throw new Error("Não há tileset para o tile id: " + currTileId);
        }
  
        const { x, y } = {
          x: (i % this.width) * currentTileset.getTileWidth(),
          y: Math.floor(i / this.width) * currentTileset.getTileHeight(),
        };
  
        const tile = currentTileset.getTile(currTileId);
        
        const tileX = this.x + x;
        const tileY = this.y + y;
  
        ctx.save();
  
        if (this.opacity) ctx.globalAlpha = this.opacity;
  
        ctx.translate(tileX + tile.getWidth() / 2, tileY + tile.getHeight() / 2);
  
        if (isFlippedDiagonal) {
          ctx.rotate(Math.PI / 2);
          ctx.scale(1, -1);

        } else {
          const scaleX = isFlippedHorizontal ? -1 : 1;
          const scaleY = isFlippedVertical ? -1 : 1;
          ctx.scale(scaleX, scaleY);
        }
  
        ctx.translate(-tile.getWidth() / 2, -tile.getHeight() / 2);
  
        tile.draw(ctx);
  
        ctx.restore();
      }
  
      return canvas;
    } else {
      throw new Error("there is no data");
    }
  }
  
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getData(): number[] | undefined {
    return this.data;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public getOpacity(): number {
    return this.opacity;
  }

  public getType(): string {
    return this.type;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getLayers(): Layer[] | undefined {
    return this.layers;
  }

  public getParalaxX() {
    return this.parallaxx;
  }

  public getParalaxY() {
    return this.parallaxy;
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  getOffsetX() {
    return this.offsetx;
  }

  getOffsetY() {
    return this.offsety;
  }
}
