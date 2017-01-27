import {createCompoundReducer} from '../compound-reducer.js';
import * as imageSetReducer from './image-set/index.js';
import * as selectedImagesReducer from './selected-images.js';

export function get() {
    return createCompoundReducer({
        imageSet: imageSetReducer.get(),
        selectedImages: selectedImagesReducer.get()
    })
}
