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

function getInitialProps () {
    return loadInitialJson()
        .then((initialJson) => {
            const items = initialJson.imageList.map(({url}, idx) => {
                return {
                    url: url,
                    x: idx,
                    y: idx
                };
            });

            return {items};
        });
}

function loadInitialJson () {
    return new Promise((fulfill) => {
        fulfill(JSON.parse(new Buffer(document.getElementById('initial-props').textContent, 'base64').toString()));
    });
}
