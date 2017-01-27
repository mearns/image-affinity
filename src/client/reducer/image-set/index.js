import * as imageItemReducer from './image-item';

export function get() {
    const itemReducer = imageItemReducer.get();
    return (state, {itemKey, type, payload}) => {
        state[itemKey] = itemReducer(state[itemKey], {type, payload});
        return state;
    };
}
