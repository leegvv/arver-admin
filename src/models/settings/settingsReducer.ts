import defaultSettings from '@/config/defaultSettings';

const settingsReducer = (state = {settings: defaultSettings}, action: {type: string}) => {
    switch (action.type) {
        default: return state;
    }
};

export default settingsReducer;
