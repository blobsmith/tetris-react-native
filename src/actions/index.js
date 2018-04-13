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

export const nextShapeAction = (shape) => ({
  type: 'NEXT_SHAPE',
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

export const loadScoresAction = (scores) => ({
  type: 'LOAD_SCORES',
  scores: scores,
});

export const newScoreAction = (score = false) => ({
  type: 'NEW_SCORE',
  score: score,
});

export const wfNextStateAction = (bestScores = false, points = false) => ({
  type: 'WF_NEXT_STATE',
  bestScores: bestScores,
  points: points,
});

export const wfSetStateAction = (state) => ({
  type: 'WF_SET_STATE',
  state: state,
});
