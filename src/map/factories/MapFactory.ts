import { TMap } from '../Map';
import { Layer } from '../Layer';
import { TilesetFactory } from './TilesetFactory';

interface ITiledMapFactory {
  jsonData: ITiledMap;
  tilesetsFolder: string;
  spritesheetsBasePath: string
}

export class TiledMapFactory {
  public isMapLoaded: boolean = false;

  public async load({jsonData, spritesheetsBasePath, tilesetsFolder} : ITiledMapFactory, onProgress?: (percentage: number) => void): Promise<TMap> {
    this.isMapLoaded = false; 

    const width = jsonData.width;
    const height = jsonData.height;
    const tileWidth = jsonData.tilewidth;
    const tileHeight = jsonData.tileheight;
    
    const totalTilesets = jsonData.tilesets.length;
    const tileSets = await Promise.all(jsonData.tilesets.map(async (tilesetJson: ITilesetFactory, index: number) => {
      const tilesetFactory = new TilesetFactory(tilesetsFolder, spritesheetsBasePath);
      const tileset = await tilesetFactory.createFromJson(tilesetJson);
      

      if (onProgress) {
        onProgress(Math.floor(((index + 1) / totalTilesets) * 100)); 
      }

      return tileset;
    }));

    const layers: Layer[] = [];
    const jsonLayers: ILayer[] = jsonData.layers;

    jsonLayers.forEach((layerData: ILayer) => {
      layers.push(new Layer(layerData));
    });


    this.isMapLoaded = true;
    
    return new TMap(width, height, tileWidth, tileHeight, layers, tileSets);
  }
}
