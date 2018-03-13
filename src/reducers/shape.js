
const shapeReducer = (state = [], action) => {
    let newShape = state;
    switch(action.type) {
        case 'NEW_SHAPE':
            newShape = action.shape;
            break;

        default:
            newShape = state;
    }
    return newShape;
};


export default shapeReducer;