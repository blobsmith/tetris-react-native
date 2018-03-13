export const newGameAction = () => ({
  type: 'NEW_GAME'
});

export const insertShapeInAreaAction = (shapeCoordinate, coordinate) => ({
  type: 'INSERT_SHAPE_IN_AREA',
  shapeCoordinate: shapeCoordinate,
  coordinate: coordinate
});

export const newShapeAction = (shape) => ({
  type: 'NEW_SHAPE',
  shape: shape
});

export const rotateAction = (gameArea, coordinate, shape) => ({
  type: 'ROTATE',
  area: gameArea,
  coordinate: coordinate,
  shape: shape
});

export const goRightAction = (gameArea, shapeCoordinate) => ({
  type: 'GO_RIGHT',
  area: gameArea,
  shapeCoordinate: shapeCoordinate
});

export const goLeftAction = (gameArea, shapeCoordinate) => ({
  type: 'GO_LEFT',
  area: gameArea,
  shapeCoordinate: shapeCoordinate
});

export const goDownAction = (gameArea, shapeCoordinate) => ({
  type: 'GO_DOWN',
  area: gameArea,
  shapeCoordinate: shapeCoordinate
});

export const removingWholeLinesAction = (gameArea, gameStat) => ({
  type: 'REMOVE_WHOLE_LINES',
  area: gameArea,
  gameStat: gameStat
});

