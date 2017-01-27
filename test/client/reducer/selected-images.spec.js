// Support
import {expect} from 'chai';

const Actions = {
    TOGGLE: 'toggle-image-selected'
};

// Module Under test
import * as selectedImages from '../../../src/client/reducer/selected-images';

describe('selected-images reducer', () => {
    let reducerUnderTest;

    beforeEach(() => {
        reducerUnderTest = selectedImages.get();
    });

    afterEach(() => {});

    describe('when given an action to toggle an image selection', () => {
        it('should add the specified item key to the state if not already present', () => {
            // Given
            const state = {foo: true, bar: true};
            const testItemKey = 'baz';

            // when
            const outputState = reducerUnderTest(state, {type: Actions.TOGGLE, itemKey: testItemKey});

            // then
            expect(outputState).to.have.property(testItemKey, true);
        });

        it('should remove the specified item key from the state if already present', () => {
            // Given
            const testItemKey = 'bar';
            const state = {foo: true, [testItemKey]: true};

            // when
            const outputState = reducerUnderTest(state, {type: Actions.TOGGLE, itemKey: testItemKey});

            // then
            expect(outputState).to.not.have.property(testItemKey);
        });
    });
});
