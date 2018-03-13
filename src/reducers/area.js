import blockManagement from '../services/BlockService';

const areaReducer = (state = [], action) => {
    let newMap = state;
    switch(action.type) {

        case 'NEW_GAME':
            let i = 0;
            newMap = [];
            while(i < 25) {
                newMap.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                i += 1;
            }
            newMap.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;

        case 'INSERT_SHAPE_IN_AREA':
            const blocksRealCoordinates = blockManagement.getBlocksRealCoordinates(action.shapeCoordinate, action.coordinate);
            newMap = blockManagement.setBlocksInArea(blocksRealCoordinates, state);
            break;

        case 'REMOVE_WHOLE_LINES':
            newMap = blockManagement.blocksRemover(action.area, action.gameStat);
            break;

        default:
            return newMap;
    }
    return  newMap;
};


export default areaReducer;