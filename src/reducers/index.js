import { combineReducers } from 'redux'
import coordinateReducer from './coordinate'
import shapeCoordinateReducer from './shapeCoordinate'
import areaReducer from './area'
import shapeReducer from './shape'
import nextShapeReducer from './nextShape'

const tetrisReducers = combineReducers({
  coordinate: coordinateReducer,
  shapeCoordinate: shapeCoordinateReducer,
  area: areaReducer,
  shape: shapeReducer,
  nextShape: nextShapeReducer,
});

export default tetrisReducers;