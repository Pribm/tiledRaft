import { Tileset } from "../Tileset";

export class TilesetFactory {
  private basePath: string;
  private spritesheetsBasePath: string;

  constructor(basePath = "", spritesheetsBasePath = "") {
    this.basePath = basePath;
    this.spritesheetsBasePath = spritesheetsBasePath;
  }

  public async createFromJson(tileSetJson: ITilesetFactory): Promise<Tileset> {
    const tilesetData: ITileset = await import(
      /* @vite-ignore */ `${this.basePath}/${tileSetJson.source}`
    );

    const image = await this.loadImage(tilesetData.image);

    // Agora que a imagem está carregada, você pode instanciar o Tileset
    return new Tileset(tilesetData, tileSetJson.firstgid, image);
  }

  // Método para carregar a imagem com uma Promise
  private loadImage(imagePath: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const fileName = imagePath.split("/").pop();
      const spritesheetsPath = "/" + this.spritesheetsBasePath + "/" + fileName;

      image.onload = () => resolve(image);
      image.onerror = (error) => reject(new Error(`Erro ao carregar imagem: ${spritesheetsPath}, ${error}`));
      image.src = spritesheetsPath;
    });
  }
}
