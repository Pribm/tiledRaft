import { Layer } from "./Layer";
import { Tileset } from "./Tileset";

export class TMap {
  private width: number;
  private height: number;
  private tileWidth: number;
  private tileHeight: number;
  private layers: Layer[];
  private tilesets: Tileset[];

  private mountedLayers: {image: OffscreenCanvas, layer: Layer}[] = [];

  private layerMap: Map<Layer, OffscreenCanvas[]> = new Map();
  private allLayers: Layer[] = [];

  constructor(
    width: number,
    height: number,
    tileWidth: number,
    tileHeight: number,
    layers: Layer[],
    tilesets: Tileset[]
  ) {
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.layers = layers;
    this.tilesets = tilesets;
    this.mountLayers(this.layers);
    this.flatLayers(this.layers);
  }

  private mountLayers(layers: Layer[]) {
    layers.forEach((layer) => {
      if (layer.data) {
        const mountedLayer = layer.mount(
          this.tilesets,
          this.width * this.tileWidth,
          this.height * this.tileHeight
        );
        
        this.mountedLayers.push({image: mountedLayer, layer});
        this.layerMap.set(layer, [mountedLayer]);
      }

      const nestedLayers = layer.getLayers();
      if (nestedLayers?.length) {
        this.mountLayers(nestedLayers); // Chamada recursiva para as camadas aninhadas

        // Atualiza o mapeamento para as camadas aninhadas
        this.layerMap.set(layer, [
          ...(this.layerMap.get(layer) || []),
          ...nestedLayers.flatMap(
            (nestedLayer : Layer) => this.layerMap.get(nestedLayer) || []
          ),
        ]);
      }
    });
  }

  private flatLayers(layers: Layer[]) {
    layers.forEach((layer) => {
      if (layer.getData()) {
        this.allLayers.push(layer);
      }

      if (layer.getLayers()) {
        this.flatLayers(layer.getLayers()!);
      }
    });
  }

  public setDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public getLayers(): Layer[] {
    return this.layers;
  }

  public getWidth(): number {
    return this.width * this.tileHeight;
  }

  public getTileWidth() {
    return this.tileWidth;
  }

  public getTileHeight() {
    return this.tileHeight;
  }

  public getHeight(): number {
    return this.height * this.tileHeight;
  }

  public getTileSets() {
    return this.tilesets;
  }

  public getLayerByName(layerName: string): Layer {
    const selectedLayer = this.layers.find(
      (layer) => layer.getName() === layerName
    );

    if (!selectedLayer)
      throw new Error("there is no layer with such name " + layerName);

    return selectedLayer;
  }

  public getLayerImages() {
    return this.mountedLayers;
  }

  public getLayerMap(){
    return this.layerMap
  }

  public getLayerImage(layerName: string) {
    const selectedLayer = this.layers.find(
      (layer) => layer.getName() === layerName
    );

    if (!selectedLayer)
      throw new Error("there is no layer with such name " + layerName);
    const layerImage = this.layerMap.get(selectedLayer);

    if (!layerImage)
      throw new Error("there is no layer with such name " + layerName);

    return layerImage;
  }
}
