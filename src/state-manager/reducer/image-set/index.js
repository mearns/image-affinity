import * as imageItemReducer from './image-item';

export function get() {
    const itemReducer = imageItemReducer.get();
    return (state, {itemKey, type, payload}, reducer) => {
        state[itemKey] = itemReducer(state[itemKey], {type, payload}, reducer);
        return state;
    };
}
