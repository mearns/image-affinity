import {createCompoundReducer} from '../compound-reducer.js';
import * as imageSetReducer from './image-set/index.js';

export function get() {
    return createCompoundReducer({
        imageSet: imageSetReducer.get()
    })
}
