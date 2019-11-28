import {combineReducers} from 'redux';
import settingsReducer from './settings/settingsReducer';

const reducers = combineReducers({settingsReducer});

export default reducers;
