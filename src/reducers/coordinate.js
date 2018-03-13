import blockManagement from '../services/BlockService'

const initCoordinate = {
    x: 6,
    y: 1
};

const coordinateReducer = (state = initCoordinate, action) => {
    let newCoordinate = state;
    switch(action.type) {

        case 'NEW_SHAPE':
            newCoordinate = initCoordinate;
            break;

        case 'GO_DOWN':
            const coordinateAfterGoDown = {
                x: state.x,
                y: state.y + 1
            };
            if (blockManagement.blocksAreInArea(action.shapeCoordinate, coordinateAfterGoDown, action.area)) {
                newCoordinate = coordinateAfterGoDown;
            }
            break;

        case 'GO_RIGHT':
            const coordinateAfterGoRight = {
                x: state.x + 1,
                y: state.y
            };
            if (blockManagement.blocksAreInArea(action.shapeCoordinate, coordinateAfterGoRight, action.area)) {
                newCoordinate =  coordinateAfterGoRight;
            }
            break;

        case 'GO_LEFT':
            const coordinateAfterGoLeft = {
                x: state.x - 1,
                y: state.y
            };
            if (blockManagement.blocksAreInArea(action.shapeCoordinate, coordinateAfterGoLeft, action.area)) {
                newCoordinate = coordinateAfterGoLeft;
            }
            break;

        default:
            newCoordinate = state;
    }
    return newCoordinate;
};


export default coordinateReducer;