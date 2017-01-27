import {createCompoundReducer} from '../reducer-utils';
import * as imageSetReducer from './image-set';
import * as selectedImagesReducer from './selected-images';

export function get() {
    return createCompoundReducer({
        imageSet: imageSetReducer.get(),
        selectedImages: selectedImagesReducer.get()
    })
}
