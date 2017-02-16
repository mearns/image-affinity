import {createStore} from 'redux';

function reducer(state, action) {
    const reducers = [selectedItemsReducer, dragReducer];
    return reducers.reduce((oldState, reducer) => {
        return reducer(oldState, action);
    }, state);
}


function getSelectedImages(state) {
    return Object.keys(state.imageSet)
        .filter((itemKey) => state.imageSet[itemKey].selected)
        .map((itemKey) => {
            const item = state.imageSet[itemKey];
            return {
                itemKey,
                start: {
                    x: item.pos.x,
                    y: item.pos.y
                }
            };
        });
}

function dragReducer(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {

        case 'drag-item-start': {
            newState.drag = {
                type: 'item',
                didDrag: false,
                sourceItemKey: payload.itemKey,
                start: {
                    x: payload.itemPayload.pos.x,
                    y: payload.itemPayload.pos.y
                },
                selectedImages: getSelectedImages(state)
            };
        } break;

        case 'drag-item-end': {
            if (state.drag) {
                switch (state.drag.type) {
                    case 'item': {
                        if (!state.drag.didDrag) {
                            Object.keys(newState.imageSet).forEach((itemKey) => {
                                newState.imageSet[itemKey].selected = false;
                            });
                            newState.imageSet[payload.itemKey].selected = true;
                        }
                    } break;

                    default:
                        throw new Error(`Unknown drag type: ${state.drag.type}`);
                }
            }
            newState.drag = null;
        } break;

        case 'mouse-move': {
            if (state.drag) {
                state.drag.didDrag = true;
                switch (state.drag.type) {
                    case 'item': {
                        const pos = payload.pos;
                        const dx = pos.x - state.drag.start.x;
                        const dy = pos.y - state.drag.start.y;
                        state.drag.selectedImages.forEach(({itemKey, start}) => {
                            newState.imageSet[itemKey].pos.x = start.x + dx;
                            newState.imageSet[itemKey].pos.y = start.y + dy;
                        });
                    } break;

                    default:
                        throw new Error(`Unknown drag type: ${state.drag.type}`);
                }
            }
        } break;
    }
    return newState;
}

function selectedItemsReducer(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {
        case 'select-item': {
            state.imageSet[payload.itemKey].selected = true;
        } break;

        case 'select-item-toggle': {
            const {itemKey} = payload;
            newState.imageSet[itemKey].selected = !state.imageSet[itemKey].selected;
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
