import {TestComponent} from './components/Test.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export function main() {
    const props = JSON.parse(getInitialProps());
    ReactDOM.render(<TestComponent {...props}/>, document.getElementById('frame'));
}

function getInitialProps () {
    return new Buffer(document.getElementById('initial-props').textContent, 'base64').toString();
}
