// Support
import {expect} from 'chai';
import sinon from 'sinon';

// For mocking
import * as imageSetReducer from '../../../src/client/reducers/image-set';
import * as selectedImagesReducer from '../../../src/client/reducers/selected-images';

// Module Under test
import * as reducers from '../../../src/client/reducers/index.js';

describe('The reducers module', () => {
    describe('the returned reducer function', () => {

        const expectedComponentReducers = [
            [imageSetReducer, 'image-set', 'imageSet'],
            [selectedImagesReducer, 'selected-images', 'selectedImages']
        ];

        let sandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            expectedComponentReducers.forEach(([reducerModule]) => {
                sandbox.stub(reducerModule, 'get').returns((state) => state);
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        function mockReducer(state, {type}) {
            return `${state.toUpperCase()}-${type}`;
        }

        expectedComponentReducers.forEach(([reducerModule, reducerName, stateKey]) => {
            it(`should apply the ${reducerName} reducer to the "${stateKey}" state`, () => {
                // given
                const testInputState = {[stateKey]: 'foo'};
                const testInputAction = {type: 'TEST_TYPE'};
                reducerModule.get.restore();
                sandbox.stub(reducerModule, 'get').returns(mockReducer);

                // when
                const reducerUnderTest = reducers.get();
                const outputState = reducerUnderTest(testInputState, testInputAction);

                // then
                expect(outputState[stateKey]).to.deep.equal('FOO-TEST_TYPE');
            });
        });
    });
});
