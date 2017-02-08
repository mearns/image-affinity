import {createStore} from 'redux';

function reducer(state, action) {
    const reducers = [reduceSelectedItems];
    return reducers.reduce((oldState, reducer) => {
        return reducer(oldState, action);
    }, state);
}

function reduceSelectedItems(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {
        case 'toggle-select-item': {
            const {itemKey} = payload;
            if (newState.selectedImages[itemKey]) {
                delete(newState.selectedImages[itemKey]);
            }
            else {
                newState.selectedImages[itemKey] = newState.imageSet[itemKey];
            }
        } break;

        case 'toggle-select-only-item': {
            const {itemKey} = payload;
            const ONLY_ONE_SELECTED = 1;
            if (newState.selectedImages.length === ONLY_ONE_SELECTED) {
                if (newState.selectedImages[itemKey]) {
                    newState.selectedImages = {};
                }
                else {
                    newState.selectedImages = {
                        [itemKey]: newState.imageSet[itemKey]
                    };
                }
            }
            else {
                newState.selectedImages = {
                    [itemKey]: newState.imageSet[itemKey]
                };
            }
        } break;
    }
    return newState;
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
