/**
 * Manage blocks coordinates and blocks coordinates in area.
 */
class BlockService {

  constructor() {

    // All available shapes.
    this.shapes = [
      require('../shapes/BarShape'),
      require('../shapes/InverseLShape'),
      require('../shapes/InverseZShape'),
      require('../shapes/LShape'),
      require('../shapes/SquareShape'),
      require('../shapes/TriangleShape'),
      require('../shapes/ZShape')
    ];
  }

  /**
   * Get the selected shape.
   *
   * @param id
   *    Number of shape defined in the shapes array.
   *
   * @returns Object
   *    An object shape.
   */
  getShapeById = (id) => {
    return this.shapes[id];
  };

  /**
   * Return randomly a shape from all shapes defined in the shapes array.
   *
   * @returns Object
   *    An object shape.
   */
  getShapeRandomly = () => {
    const randomNumber = Math.floor((Math.random() * this.shapes.length));
    const shape = this.shapes[randomNumber];
    if (shape !== undefined) {
      return shape.default;
    }
    return undefined;
  };

  /**
   * Save the last blocks coordinates in the game area (before new shape...)
   *
   * @param blocksRealCoordinate
   *    Real coordinate of blocks.
   * @param area
   *    Game area.
   *
   * @returns {*}
   *    New game area.
   */
  setBlocksInArea = (blocksRealCoordinate, area) => {
    const newArea = [];
    for (const key in area) {
      newArea.push(area[key]);
    }
    for(const key in blocksRealCoordinate) {
      const coordinate = blocksRealCoordinate[key];
      newArea[coordinate[1]][(coordinate[0])] = 1;
    }
    return newArea;
  };

  /**
   *  Convert a shape coordinate to real coordinate corresponding to blocks in area.
   * @param blocks
   *    Blocks coordinates of a shape.
   * @param coordinates
   *    Simple coordinate corresponding to fall position.
   * @param blockSize
   *    Simple coordinate corresponding to fall position. (block size equal 1 in area)
   *
   * @returns {Array}
   *    Coordinates of shape blocks in area.
   */
  getBlocksRealCoordinates = (blocks, coordinates, blockSize = 1) => {
    const realCoordinates = [];
    if (coordinates !== undefined && coordinates.x !== undefined && coordinates.y !== undefined ) {
      for (const key in blocks) {
        let block = blocks[key];
        realCoordinates.push([(parseInt(coordinates.x, 10) + parseInt(block[0], 10))*blockSize, (parseInt(coordinates.y, 10) + parseInt(block[1], 10))*blockSize]);
      }
    }
    return realCoordinates;
  };

  /**
   * Check whether or not coordinates of shape can be saved in area.
   *
   * @param blocks
   *    Blocks coordinates of a shape
   * @param coordinate
   *    Simple coordinate corresponding to fall position.
   * @param area
   *    Array corresponding to Area.
   * @returns {boolean}
   *    TRUE if shape can be save in the area.
   */
  blocksAreInArea = (blocks, coordinate, area) => {
    let inArea = true;
    if (coordinate !== undefined && area !== undefined) {
      const blocksRealCoordinates = this.getBlocksRealCoordinates(blocks, coordinate);
      for(const key in blocksRealCoordinates) {
        const blockCoordinate = blocksRealCoordinates[key];
        if (area[blockCoordinate[1]] !== undefined) {
          if (area[blockCoordinate[1]][(blockCoordinate[0])] !== 0) {
            inArea = false;
            break;
          }
        }
      }
    }
    return inArea;
  };

  /**
   * Rotate a shape.
   *
   * @param coordinates
   *      Blocks coordinates of the shape to rotate.
   * @param reverse
   *      true in order to inverse the rotation sens.
   */
  rotate = (coordinates, reverse = false) => {
    let newCoordinate = [];
    let rotateMatrix = [
      [0, -1],
      [1, 0]
    ];
    if (reverse) {
      rotateMatrix = [
        [0, 1],
        [-1, 0]
      ];
    }

    for (let key in coordinates) {
      const position = coordinates[key];

      // Dot product
      newCoordinate.push([
        position[0]*rotateMatrix[0][0] + position[1]*rotateMatrix[1][0],
        position[0]*rotateMatrix[0][1] + position[1]*rotateMatrix[1][1],
      ]);
    }
    return newCoordinate;
  };

  /**
   * Remove whole lines
   *
   * @param area
   *    Game area.
   * @param gameStat
   *    Stats service.
   *
   * @returns {*}
   *    New game area.
   */
  blocksRemover = (area, gameStat) => {
    let count = 0;
    let newArea;
    const reducer = (accumulator, line) => {
      count++;
      if (count < 26) {
        const isWholeLine = line.reduce((accumulator, currentValue) => accumulator && currentValue);
        if (!isWholeLine) {
          accumulator.push(line);
        }
        else {
          gameStat.setLineRemoved(count);
          accumulator.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
        }
      }
      else {
        accumulator.push(line);
      }
      return accumulator;
    };
    newArea = area.reduce(reducer, []);
    return newArea;
  }

}

const blockService = new BlockService();
export default blockService;

