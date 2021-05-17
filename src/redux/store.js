import { applyMiddleware, combineReducers, createStore } from "redux";
import carReducer from './carReducer';
import authReducer from './authReducer';
import { createStateSyncMiddleware, initStateWithPrevTab, withReduxStateSync } from "redux-state-sync";

const config = {
    blacklist: ['TOGGLE_TODO'],
}

const middlewares = [createStateSyncMiddleware(config)];

const reducers = combineReducers({
    carReducer,
    authReducer
})

const store = createStore(withReduxStateSync(reducers), {}, applyMiddleware(...middlewares));

initStateWithPrevTab(store);

window.store = store;

export default store;