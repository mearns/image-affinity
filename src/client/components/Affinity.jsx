import React from 'react';
import mapObject from 'lodash.map';
import {ImageItem} from './ImageItem.jsx';

export class Affinity extends React.Component {
    render() {
        const listItems = mapObject(this.props.items, ({url, x, y}) => {
            const initialSeparation = 10;
            const props = {
                url,
                x: initialSeparation*x,
                y: initialSeparation*y
            };
            return (
                <li key={url}><ImageItem {...props} /></li>
            );
        });
        return (<ul>{listItems}</ul>);
    }
}

Affinity.propTypes = {
    items: React.PropTypes.object
};
