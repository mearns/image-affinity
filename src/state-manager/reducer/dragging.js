
export function get() {
    return reducer;
}

const defaultState = {
    dragStart: null
};

function reducer(state = defaultState, {type, payload}, dispatch) {
    switch (type) {
        case 'item-drag-start': {
            state.dragStart = {
                x: payload.event.clientX,
                y: payload.event.clientY
            };
        } break;

        case 'item-drag-end':{
            state.dragStart = null;
        } break;

        case 'item-dragged': {
            const dx = payload.event.clientX - state.dragStart.x;
            const dy = payload.event.clientY - state.dragStart.y;
            dispatch('move-selected-items-by', {moveBy: {dx, dy}});
        } break;
    }
    return state;
}
