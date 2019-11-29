import defaultSettings from '@/config/defaultSettings';

const settingsReducer = (state = defaultSettings, action: {type: string}) => {
    switch (action.type) {
        default: return state;
    }
};

export default settingsReducer;
