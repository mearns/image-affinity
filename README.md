# Image Affinity

Do an affinity session with images.

## Selection

*   Click on an item (no modifier) - set the item as the only selected image.
*   Click on an item (with modifier) - toggle the selection of the image.
*   Drag an item that is already selected - drag all selected images.
*   Drag an item not already selected - set the item as the only selected image and drag it.

### Events

*   mouse-down (no modifier) - set item as only selected, record drag-start. (select-item-only, drag-item-start)
*   mouse-down (with modifier) - toggle item selection. (select-item-toggle)
*   mouse-move - if drag started, move all selected items. (mouse-move)
*   mouse-up - clear drag. (drag-item-end)
