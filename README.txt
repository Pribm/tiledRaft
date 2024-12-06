Overview
This library allows you to work with tile-based maps in 2D games or applications, using a set of tools to load, render, and manage tilemaps and tilesets. It handles the loading of tileset images, rendering of tiles onto layers, and management of tilemaps that may include nested layers.

Features
Tileset Management: Handles the loading and processing of tilesets from image files and JSON data.
Layer Management: Supports the rendering of multiple layers, including nested layers, with efficient offscreen canvas rendering.
Tile Rendering: Renders individual tiles from a tileset and supports tile flipping (horizontal, vertical, diagonal).
Map Rendering: Renders tilemaps with configurable dimensions and tile properties, including parallax scrolling.
Offscreen Canvas: Utilizes OffscreenCanvas to optimize rendering performance, especially for larger maps.
Installation
To use this library, you can either clone the repository or install it via a package manager if published to npm or another package registry.

Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/tilemap-renderer.git
cd tilemap-renderer
Install dependencies:

bash
Copy code
npm install
Usage
1. Tileset Creation
A tileset is created from a JSON file that describes the tileset and an image file that contains the tiles. The library provides a TilesetFactory for creating tilesets from JSON data.

typescript
Copy code
import { TilesetFactory } from './TilesetFactory';
import { Tileset } from './Tileset';

const factory = new TilesetFactory();
const tilesetJson = { source: 'tileset.json', firstgid: 1 };

const tileset = await factory.createFromJson(tilesetJson);
This will create a Tileset object that you can use to render individual tiles.

2. Layer Management
Layers represent different levels of a tilemap, such as the background, terrain, and objects. Each layer consists of tile data, and this library supports nested layers.

typescript
Copy code
import { Layer } from './Layer';
import { Tileset } from './Tileset';

const layerData = [
  { id: 1, name: 'Layer 1', visible: true, data: [1, 2, 3, 4] },
  { id: 2, name: 'Layer 2', visible: true, data: [5, 6, 7, 8] },
];

const tileset = new Tileset(tilesetData, 1, image);
const layers = layerData.map(data => new Layer(data));

const map = new TMap(10, 10, 32, 32, layers, [tileset]);
3. Map Rendering
Once the tileset and layers are created, you can render the entire tilemap using the TMap class. It uses offscreen canvases for better performance and handles both basic and parallax layers.

typescript
Copy code
const offscreenCanvas = new OffscreenCanvas(map.getWidth(), map.getHeight());
const ctx = offscreenCanvas.getContext('2d');

map.getLayerImages().forEach(({ image, layer }) => {
  ctx.drawImage(image, 0, 0);
});
4. Tile Rendering
Each individual tile in a tileset can be rendered using the Tile class, which represents a single tile.

typescript
Copy code
const tile = tileset.getTile(3); // Get tile with ID 3
tile.setPosition(100, 100);
tile.draw(ctx); // Draw the tile at position (100, 100)
5. Parallax Scrolling
Layers can have parallax scrolling, which affects their movement speed relative to other layers. Use the parallaxx and parallaxy properties of a layer to define the scrolling speed.

typescript
Copy code
layer.setX(layer.getX() + layer.getParalaxX());
layer.setY(layer.getY() + layer.getParalaxY());
API Reference
TilesetFactory Class
createFromJson(tileSetJson: ITilesetFactory)
Creates a Tileset from a JSON file.

Parameters:
tileSetJson: JSON object with properties:
source: Path to the JSON file.
firstgid: The first global ID of the tileset.
Returns: A promise that resolves to a Tileset.
Tileset Class
getTile(tileData: number)
Returns a Tile from a specific tile ID.

Parameters:

tileData: The tile ID to fetch.
Returns: A Tile object representing the requested tile.

getTilePosition(tileIndex: number)
Returns the x, y position of the tile in the tileset image.

Parameters:

tileIndex: Index of the tile in the tileset.
Returns: An object containing x and y coordinates.

Tile Class
setPosition(dx: number, dy: number)
Sets the position of the tile on the canvas.

Parameters:
dx: X position.
dy: Y position.
draw(ctx: CanvasRenderingContext2D)
Draws the tile onto a canvas context.

Parameters:
ctx: The canvas rendering context.
Layer Class
mount(tileSets: Tileset[], mapWidth: number, mapHeight: number)
Mounts the layer onto an offscreen canvas.

Parameters:

tileSets: Array of Tileset objects.
mapWidth: Width of the map in pixels.
mapHeight: Height of the map in pixels.
Returns: An OffscreenCanvas containing the rendered layer.

TMap Class
getLayerImages()
Returns an array of mounted layers.

Returns: An array of objects containing the image (OffscreenCanvas) and the layer.
getLayerMap()
Returns the map of layers, including nested layers.

Returns: A map with layer names as keys and arrays of corresponding images as values.
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
License
This library is open-source and released under the MIT License.

Example Directory Structure
plaintext
Copy code
src/
│
├── Tile.ts             # Tile class for individual tile handling
├── Tileset.ts          # Tileset class for managing tilesets
├── Layer.ts            # Layer class for managing map layers
├── TMap.ts             # TileMap class for handling maps
├── TilesetFactory.ts   # Factory class to create tilesets from JSON
└── utils.ts            # Utility functions
This README provides an overview of how to use and integrate the library into your own project. It covers essential features like tileset creation, layer management, tile rendering, map handling, and performance optimizations using offscreen canvases.