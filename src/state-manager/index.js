import {createStore} from 'redux';

function reducer(state, action) {
    const reducers = [selectedItemsReducer, dragReducer];
    return reducers.reduce((oldState, reducer) => {
        return reducer(oldState, action);
    }, state);
}

function dragReducer(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {

        case 'item-drag-start': {
            const {itemKey} = payload;
            const item = state.imageSet[itemKey];
            newState.drag = {
                start: {
                    x: payload.itemPayload.pos.x,
                    y: payload.itemPayload.pos.y
                },
                // FIXME: Instead of tracking state.selectedImages, put a boolean 'selected'
                // field in each item, and build drag.selectedImages on drag start.
                selectedImages: [{
                    itemKey,
                    start: {
                        x: item.pos.x,
                        y: item.pos.y
                    }
                }]
            };
        } break;

        case 'item-drag-end': {
            newState.drag = null;
        } break;

        case 'mouse-move': {
            if (state.drag) {
                const pos = payload.pos;
                const dx = pos.x - state.drag.start.x;
                const dy = pos.y - state.drag.start.y;
                state.drag.selectedImages.forEach(({itemKey, start}) => {
                    newState.imageSet[itemKey].pos.x = start.x + dx;
                    newState.imageSet[itemKey].pos.y = start.y + dy;
                });
            }
        } break;
    }
    return newState;
}

function selectedItemsReducer(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {
        case 'toggle-select-item': {
            const {itemKey} = payload;
            if (newState.selectedImages[itemKey]) {
                delete(newState.selectedImages[itemKey]);
            }
            else {
                newState.selectedImages[itemKey] = true;
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
                        [itemKey]: true
                    };
                }
            }
            else {
                newState.selectedImages = {
                    [itemKey]: true
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
