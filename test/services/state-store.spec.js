// Support
import {expect} from 'chai';

// Module Under test
import * as stateStore from '../../src/services/state-store';

describe('state-store module', () => {

    describe('StateStore class', () => {
        describe('dispatch() method', () => {
            it('should update the state according to the dispatched actions in order', () => {
                // given
                const testReducer = (oldState, action) => {
                    return `${oldState}_${action.type}_${action.payload}`;
                };
                const stateStoreUnderTest = new stateStore.StateStore(testReducer);
                const initialState = 'initial-state';
                const testAction1 = {
                    type: 'test-type-1',
                    payload: 'test-payload-1'
                };
                const testAction2 = {
                    type: 'test-type-2',
                    payload: 'test-payload-2'
                };

                // When
                const updatedState = stateStoreUnderTest.dispatch(initialState, testAction1, testAction2);

                // Then
                expect(updatedState).to.deep
                    .equal('initial-state_test-type-1_test-payload-1_test-type-2_test-payload-2');
            });

            it('should queue up dispatched events and appy them', () => {
                // given
                const testReducer = (oldState, action, dispatch) => {
                    if (action.type === 'first-action') {
                        dispatch({type: 'second-action', payload: action.payload.toUpperCase()});
                        return `${oldState}_1:${action.payload}`;
                    }
                    else if (action.type === 'second-action') {
                        return `${oldState}_2:${action.payload}`;
                    }
                    return oldState;
                };
                const stateStoreUnderTest = new stateStore.StateStore(testReducer);
                const initialState = 'initial-state';
                const initialActions = [
                    {
                        type: 'first-action',
                        payload: 'foo'
                    },
                    {
                        type: 'first-action',
                        payload: 'bar'
                    }
                ];

                // When
                const updatedState = stateStoreUnderTest.dispatch(initialState, ...initialActions);

                // Then
                expect(updatedState).to.deep.equal('initial-state_1:foo_1:bar_2:FOO_2:BAR');
            });
        });
    });

    describe('identityReducer()', () => {
        it('should return an identical value to what is passed in', () => {
            // given
            const testInputState = {foo: {bar: 'trot', baz: 'burger'}};

            // expect
            expect(stateStore.identityReducer(testInputState)).to.deep.equal(testInputState);
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
            const reducerUnderTest = stateStore.createCompoundReducer(components);
            const outputState = reducerUnderTest(testInputState);

            // expect
            expect(outputState.foo).to.deep.equal({x: X + X});
            expect(outputState.bar).to.equal('1');
            expect(outputState.baz).to.equal('bazzle');
        });
    });
});
