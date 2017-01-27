import * as selectedReducer from './selected-reducer.js';
import {createCompoundReducer} from '../../../compound-reducer.js';

export function get() {
    return createCompoundReducer({
        selected: selectedReducer.get()
    });
}
