import {Affinity} from './components/Affinity.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

export function main() {
    getInitialProps()
        .then((props) => {
            ReactDOM.render(<Affinity {...props}/>, document.getElementById('frame'));
        });
}

/**
 * Load the initial top-level React property object from the JSON element the server put in the document. This will become the initial
 * top-level state.
 */
function getInitialProps () {
    return Promise.resolve().then(() => {
        return JSON.parse(new Buffer(document.getElementById('initial-props').textContent, 'base64').toString());
    });
}
