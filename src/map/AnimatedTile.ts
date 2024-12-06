import { Tile } from "./Tile";
import { Tileset } from "./Tileset";

export class AnimatedTile {
    private animation: { tileId: number; duration: number }[];
    private currentFrame: number = 0;
    private timeElapsed: number = 0;
  
    constructor(animation: { tileId: number; duration: number }[]) {
      this.animation = animation;
    }
  
    public update(deltaTime: number) {
      this.timeElapsed += deltaTime;
      if (this.timeElapsed >= this.animation[this.currentFrame].duration) {
        this.timeElapsed = 0;
        this.currentFrame = (this.currentFrame + 1) % this.animation.length;
      }
    }
  
    public getCurrentTile(tileset: Tileset): Tile {
      const currentTileId = this.animation[this.currentFrame].tileId;
      return tileset.getTile(currentTileId);
    }

    public getAnimation(){
      return this.animation
    }
  }
  