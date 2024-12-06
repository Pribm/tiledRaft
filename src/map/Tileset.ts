import { Tile } from "./Tile";

export class Tileset {
  private columns: number;
  private image: string;
  private loadedImage: HTMLImageElement
  private imageheight: number;
  private imagewidth: number;
  private margin: number;
  private name: string;
  private spacing: number;
  private tilecount: number;
  private tiledversion: string;
  private tileheight: number;
  private tilewidth: number;
  private transparentcolor: string;
  private type: string;
  private tiles: ITilesetAnimationTile[];

  private firstGid: number;

  constructor(tileset: ITileset, firstGid: number, loadedImage: HTMLImageElement) {
    this.columns = tileset.columns;
    this.image = tileset.image;
    this.imageheight = tileset.imageheight;
    this.imagewidth = tileset.imagewidth;
    this.margin = tileset.margin;
    this.name = tileset.name;
    this.spacing = tileset.spacing;
    this.tilecount = tileset.tilecount;
    this.tiledversion = tileset.tiledversion;
    this.tileheight = tileset.tileheight;
    this.tilewidth = tileset.tilewidth;
    this.transparentcolor = tileset.transparentcolor;
    this.type = tileset.type;
    this.tiles = tileset.tiles;

    this.firstGid = firstGid;
    this.loadedImage = loadedImage
  }

  public getTile(
    tileData: number,
  ) {
    const tileIndex = tileData - this.firstGid;

    const {x, y} = this.getTilePosition(tileIndex)
    const tile = new Tile(x,y,this.tilewidth, this.tileheight, this.loadedImage)
    return tile
  }

  getTilePosition(tileIndex: number){
    const col = tileIndex % this.columns;
    const row = Math.floor(tileIndex / this.columns);
    const x = col * (this.tilewidth + this.spacing) + this.margin;
    const y = row * (this.tileheight + this.spacing) + this.margin;

    return {x, y}
  }

  // Getters
  getColumns() {
    return this.columns;
  }

  getImageHeight() {
    return this.imageheight;
  }

  getImageWidth() {
    return this.imagewidth;
  }

  getMargin() {
    return this.margin;
  }

  getName() {
    return this.name;
  }

  getSpacing() {
    return this.spacing;
  }

  getTileCount() {
    return this.tilecount;
  }

  getTiledVersion() {
    return this.tiledversion;
  }

  getTileHeight() {
    return this.tileheight;
  }

  getTileWidth() {
    return this.tilewidth;
  }

  getTransparentColor() {
    return this.transparentcolor;
  }

  getType() {
    return this.type;
  }

  getFirstGid() {
    return this.firstGid;
  }

  getAnimationTiles() {
    return this.tiles;
  }
}
