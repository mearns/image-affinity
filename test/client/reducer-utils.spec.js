// Support
import {expect} from 'chai';

// Module Under test
import * as reducerUtils from '../../src/client/reducer-utils.js';

describe('reducer-utils module', () => {

    describe('identityReducer()', () => {
        it('should return an identical value to what is passed in', () => {
            // given
            const testInputState = {foo: {bar: 'trot', baz: 'burger'}};

            // expect
            expect(reducerUtils.identityReducer(testInputState)).to.deep.equal(testInputState);
        });
    });

    describe('createCompoundReducer()', () => {
        it('should return a reducer that slices state according to the provided keys', () => {
            // given
            const X = 2;
            const BAR_INDEX = 1;
            const components = {
                foo: ({x}) => ({x: x + x}),
                bar: (state) => state[BAR_INDEX],
                baz: (state) => state.toLowerCase()
            };
            const testInputState = {
                foo: {x: X},
                bar: ['3', '1', '4'],
                baz: 'BAZZLE'
            };

            // When
            const reducerUnderTest = reducerUtils.createCompoundReducer(components);
            const outputState = reducerUnderTest(testInputState);

            // expect
            expect(outputState.foo).to.deep.equal({x: X + X});
            expect(outputState.bar).to.equal('1');
            expect(outputState.baz).to.equal('bazzle');
        });
    });
});
