// Support
import {expect} from 'chai';
import chai from 'chai';

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
            const components = {
                foo: ({x}) => ({x: x+1}),
                bar: (state) => state[1],
                baz: (state) => state.toLowerCase()
            };
            const testInputState = {
                foo: {x: 1},
                bar: [3, 1, 4],
                baz: 'BAZZLE'
            };

            // When
            const reducerUnderTest = reducerUtils.createCompoundReducer(components);
            const outputState = reducerUnderTest(testInputState);

            // expect
            expect(outputState.foo).to.deep.equal({x: 2});
            expect(outputState.bar).to.equal(1);
            expect(outputState.baz).to.equal('bazzle');
        });
    });
});
