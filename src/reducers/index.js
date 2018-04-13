import { combineReducers } from 'redux'
import coordinateReducer from './coordinate'
import shapeCoordinateReducer from './shapeCoordinate'
import areaReducer from './area'
import shapeReducer from './shape'
import nextShapeReducer from './nextShape'
import bestScoresReducer from './bestScores'
import {workflowReducer} from './workflow'

const tetrisReducers = combineReducers({
  coordinate: coordinateReducer,
  shapeCoordinate: shapeCoordinateReducer,
  area: areaReducer,
  shape: shapeReducer,
  nextShape: nextShapeReducer,
  bestScores: bestScoresReducer,
  wfState: workflowReducer,
});

export default tetrisReducers;