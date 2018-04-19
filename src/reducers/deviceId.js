import scoreService from '../services/ScoreService';

const deviceIdReducer = (state = null, action) => {

    switch (action.type) {
        case 'LOAD_DEVICE_ID':
            state = action.deviceId
            break;
    }
    return state;
};

export default deviceIdReducer;