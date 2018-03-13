import blockManagement from '../services/BlockService'

const shapeCoordinateReducer = (state = [], action) => {
    let newShapeCoordinate = state;
    switch(action.type) {
        case 'NEW_SHAPE':
            newShapeCoordinate = action.shape.blocks;
            break;

        case 'ROTATE':
            if (action.shape.rotate === undefined || action.shape.rotate) {
                const blocksAfterRotate = blockManagement.rotate(state);
                if (blockManagement.blocksAreInArea(blocksAfterRotate, action.coordinate, action.area)) {
                    newShapeCoordinate = blocksAfterRotate;
                }
            }
            break;

        default:
            newShapeCoordinate = state;
    }
    return newShapeCoordinate;
};


export default shapeCoordinateReducer;