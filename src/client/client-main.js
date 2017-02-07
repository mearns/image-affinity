import {Affinity} from '../components/Affinity';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';
import * as stateManager from '../state-manager';

export function main() {
    getInitialState()
        .then((state) => {
            console.log('Initial state', state);    // eslint-disable-line
            const store = stateManager.getStore(state);
            ReactDOM.render(
                (<Provider store={store}>
                    <Affinity />
                </Provider>),
                document.getElementById('root')
            );
        });
}

/**
 * Load the initial state object from the JSON element the server put in the document.
 */
function getInitialState () {
    return Promise.resolve().then(() => {
        return JSON.parse(new Buffer(document.getElementById('initial-state').textContent, 'base64').toString());
    });
}
