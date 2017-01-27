
export function get() {
    return reducer;
}

function reducer(state, {type, itemKey}) {
    switch (type) {
        case 'toggle-image-selected':
            if (state[itemKey]) {
                delete(state[itemKey]);
            }
            else {
                state[itemKey] = true;
            }
        break;
    }
    return state;
}
