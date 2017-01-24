import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {
    render() {
        const listItems = this.props.items.map(({url, x, y}) => {
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
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};
