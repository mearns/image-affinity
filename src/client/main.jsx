import {TestComponent} from './components/Test.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export function main() {
    console.log('Hi, React.');  // eslint-disable-line
    ReactDOM.render(<TestComponent/>, document.getElementById('frame'));
}
