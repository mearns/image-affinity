
export class StateStore {

    constructor(reducer) {
        this._reducer = reducer;
    }

    dispatch(oldState, ...actions) {
        const actionQueue = [...actions];
        const dummyDispatch = (...actions) => {
            actionQueue.splice(actionQueue.length, 0, ...actions);
        };
        let updatedState = oldState;
        for(let i=0; i<actionQueue.length; i++) {
            updatedState = this._reducer(updatedState, actionQueue[i], dummyDispatch);
        }
        return updatedState;
    }
}

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
    return (state, action, dispatch) => {
        stateKeys.forEach((key) => {
            const reducer = components[key];
            state[key] = reducer(state[key], action, dispatch);
        });
        return state;
    };
}

export function createMultiReducer(reducers) {
    return (state, action, dispatch) => {
        return reducers.reduce((oldState, reducer) => reducer(oldState, action, dispatch), state);
    }
}

export function identityReducer(state) {
    return state;
}
