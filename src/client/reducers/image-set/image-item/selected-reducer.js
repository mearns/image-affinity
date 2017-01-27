
export function get() {
    return reducer;
}

function reducer(state, {type}) {
    switch (type) {
        case 'toggle-image-selected':
            return !state;
    }
    return state;
}
