/* eslint-env browser */

import axios from 'axios';
import {createStore} from 'redux';

const KEY_CODE_ESCAPE = 27;

function reducer(state, action) {
    const reducers = [selectedItemsReducer, dragReducer, dirtyReducer];
    const newState = reducers.reduce((oldState, reducer) => {
        return reducer(oldState, action);
    }, state);
    return newState;
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

        case 'drag-item-force-end': {
            newState.drag = null;
        } break;

        case 'drag-item-end': {
            if (state.drag) {
                switch (state.drag.type) {
                    case 'item': {
                        if (!state.drag.didDrag) {
                            selectItemOnly(newState, state.drag.sourceItemKey);
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

function selectItemOnly(state, itemKey) {
    Object.keys(state.imageSet).forEach((itemKey) => {
        state.imageSet[itemKey].selected = false;
    });
    state.imageSet[itemKey].selected = true;
}

function selectedItemsReducer(state, {type, payload}) {
    const newState = Object.assign({}, state);
    switch (type) {
        case 'select-item-only': {
            selectItemOnly(state, payload.itemKey);
        } break;

        case 'select-item-toggle': {
            const {itemKey} = payload;
            newState.imageSet[itemKey].selected = !state.imageSet[itemKey].selected;
        } break;
    }
    return newState;
}

function scheduleAutoSave(store) {
    setInterval(() => {
        if (store.getState().dirty === 'dirty') {
            axios.post('/save', store.getState(), { headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    store.dispatch({type: 'set-saved'});
                })
                .catch((error) => {
                    store.dispatch({type: 'save-error', payload: error});
                });
        }
    }, 500);
}

function dirtyReducer(state, {type}) {
    let dirty = state.dirty;
    switch (type) {
        case 'set-saved': {
            dirty = 'saved';
        } break;

        case 'save-error': {
            dirty = 'erred';
        } break;

        default: {
            if ((typeof dirty) === 'undefined' || dirty === 'saved') {
                dirty = 'dirty';
            }
        } break;
    }
    return Object.assign({}, state, {dirty});
}

function _getStore(initialState) {
    if (!_getStore.stateStore) {
        _getStore.stateStore = createStore(reducer, initialState);
        scheduleAutoSave(_getStore.stateStore);
        if (document) {
            document.addEventListener('keydown', (event) => {
                if (event.keyCode === KEY_CODE_ESCAPE) {
                    _getStore.stateStore.dispatch({
                        type: 'drag-item-force-end'
                    });
                }
            });
        }
    }
    return _getStore.stateStore;
}

export function getStore(initialState) {
    return _getStore(initialState);
}
