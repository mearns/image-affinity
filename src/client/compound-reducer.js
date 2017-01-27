
/**
 * Create a reducer that only works by delegating different parts of the state to
 * component reducers.
 *
 * The `components` param is an object of key/reducer pairs: the key specifies what
 * aspect of the state will be handled by the specified reducer. Only that portion of
 * the state is passed down to the reducer, and only that portion is expected to be returned
 * (it will be placed back in the parent state object).
 */
export function createCompoundReducer(components) {
    const stateKeys = Object.keys(components);
    return (state, action) => {
        stateKeys.forEach((key) => {
            const reducer = components[key];
            state[key] = reducer(state[key], action);
        });
        return state;
    };
}
