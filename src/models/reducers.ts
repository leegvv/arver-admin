import {combineReducers} from 'redux';
import settingsReducer from './settings/settingsReducer';

const reducers = combineReducers({settings: settingsReducer});

export default reducers;
