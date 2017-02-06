
export function get() {
    return reducer;
}

function reducer(state, {type, itemKey, payload}, dispatch) {
    switch (type) {
        case 'toggle-image-selected': {
            if (state[itemKey]) {
                delete(state[itemKey]);
            }
            else {
                state[itemKey] = true;
            }
        } break;

        case 'move-selected-items-by': {
            dispatch({
                type: 'move-items-by',
                payload: {
                    moveBy: payload.moveBy,
                    itemsToMove: Object.keys(state).filter((key) => state[key])
                }
            });
        }
        break;
    }
    return state;
}
