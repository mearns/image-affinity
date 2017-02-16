# Planning

## Iteration 1 - MVP

Support for dragging images, selecting and dragging multiple images at a time, and changing
the nominal size of images, plus saving and loading state from the server.

## Future

Normal +/- will just scale the nominal image size, and individual images will have their own
"size", which will multiply the nominal image size to get their bounding box. Further, the entire
app will have a "zoom" factor, nominally 1, which will multiply the nominal image size _and_
the position of every item, which will be a true zoom. Changing the nominal size alone
will leave X, Y positions the same, so the position of the elements on the page stay the same,
changing the spacing between images.
