// Support
import {expect} from 'chai';
import sinon from 'sinon';

// To be mocked
import * as imageItemReducer from '../../../src/client/reducer/image-set/image-item';

// Module under test
import * as imageSetReducer from '../../../src/client/reducer/image-set';

describe('image-set module', () => {

    let sandbox;

    function mockReducer(state, {type, payload}) {
        return `${state.toUpperCase()}-${type}-${payload}`;
    }

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(imageItemReducer, 'get').returns(mockReducer);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should slice state based on the provided itemKey', () => {
        // given
        const reducerUnderTest = imageSetReducer.get();
        const testItemKey = 'key-1';
        const anotherItemKey = 'key-2';
        const testInputState = {
            [testItemKey]: 'foo',
            [anotherItemKey]: 'bar'
        };
        const testAction = {
            itemKey: testItemKey,
            type: 'TEST_TYPE',
            payload: 'TEST_PAYLOAD'
        };
        const outputState = reducerUnderTest(testInputState, testAction);

        // then
        expect(outputState[testItemKey]).to.deep.equal('FOO-TEST_TYPE-TEST_PAYLOAD');
    });
});
