import {createStore} from 'redux';
// import * as reducer from './reducer';

function reducer(state, action) {
    console.log('Action dispatched:', action);  // eslint-disable-line
    return state;
}

function _getStore(initialState) {
    if (!_getStore.stateStore) {
        console.log('Creating store: ', initialState);  // eslint-disable-line
        _getStore.stateStore = createStore(reducer, initialState);
    }
    return _getStore.stateStore;
}

export function getStore(initialState) {
    return _getStore(initialState);
}
