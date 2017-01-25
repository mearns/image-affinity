import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {
    render() {
        const listItems = this.props.imageList.map(({url, x, y, dimensions}) => {
            const initialSeparation = 10;
            const props = {
                url,
                x: initialSeparation*x,
                y: initialSeparation*y,
                width: dimensions.width,
                height: dimensions.height
            };
            return (
                <li key={url}><ImageItem {...props} /></li>
            );
        });
        return (<ul>{listItems}</ul>);
    }
}

Affinity.propTypes = {
    imageList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
