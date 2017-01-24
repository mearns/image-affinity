import {Affinity} from './components/Affinity.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export function main() {
    const props = getInitialProps();
    ReactDOM.render(<Affinity {...props}/>, document.getElementById('frame'));
}

function getInitialProps () {
    const initialJson = loadInitialJson();
    const items = initialJson.imageList.reduce((props, imageUrl, idx) => {
        props[imageUrl] = {
            url: imageUrl,
            x: idx,
            y: idx
        };
        return props;
    }, {});

    return {
        items
    };
}

function loadInitialJson () {
    return JSON.parse(new Buffer(document.getElementById('initial-props').textContent, 'base64').toString());
}
