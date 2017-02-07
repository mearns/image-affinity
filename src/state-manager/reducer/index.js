import {createCompoundReducer, createMultiReducer} from '../../services/state-store';
import * as imageSetReducer from './image-set';
import * as selectedImagesReducer from './selected-images';
import * as draggingReducer from './dragging';

export function get() {
    return createMultiReducer([
        createCompoundReducer({
            imageSet: imageSetReducer.get(),
            selectedImages: selectedImagesReducer.get(),
            dragging: draggingReducer.get()
        }),
        moveItemsByReducer
    ]);
}

function moveItemsByReducer(state, {type, payload}) {
    switch (type) {
        case 'move-items-by': {
            const {moveBy, itemsToMove} = payload;
            const {dx, dy} = moveBy;
            // TODO: Dispatch another event to move single items. Or move that down into the selected-images.
            itemsToMove.forEach((itemKey) => {
                state.imageSet[itemKey].pos.x += dx;
                state.imageSet[itemKey].pos.y += dy;
            });
        } break;
    }
    return state;
}
