import {Affinity} from './components/Affinity.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

export function main() {
    getInitialProps()
        .then((props) => {
            console.log(props); // eslint-disable-line
            ReactDOM.render(<Affinity {...props}/>, document.getElementById('frame'));
        });
}

function getInitialProps () {
    return new Promise((fulfill) => {
        fulfill(JSON.parse(new Buffer(document.getElementById('initial-props').textContent, 'base64').toString()));
    });
}
