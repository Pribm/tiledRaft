declare interface ITiledMap {
  compressionlevel:number;
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  infinite: boolean;
  orientation: string;
  renderorder: string;
  version: string;
  tiledversion: string;
  nextlayerid: number;
  nextobjectid: number;
  type: string;
  layers: ILayer[];                // Camadas do mapa
  tilesets: ITilesetFactory[];      // Tilesets associados
  editorsettings?: { [key: string]: any }; 
  properties?: { [key: string]: any };  // Propriedades customizadas (opcional)
}

declare interface ITilesetFactory {
  firstgid: number;
  source: string;
}

declare interface ITileset {
  columns: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tiledversion: string;
  tileheight: number;
  tilewidth: number;
  transparentcolor: string;
  type: string;
  version: string;
  tiles: ITilesetAnimationTile[]
}

declare interface ITilesetAnimationFrame {
    duration: number;
    tileid: number
}

declare interface ITilesetAnimationTile {
    animation: ITilesetAnimationFrame[]
    id: number
}

declare interface ILayer {
    id: number;
    name: string;
    data?: number[];
    width?: number;
    height?: number;
    visible: boolean;
    opacity: number;
    type: string;
    x: number;
    y: number;
    layers?: ILayer[];
    parallaxx?: number;
    parallaxy?: number;
    offsetx?: number;
    offsety?: number;
  }
