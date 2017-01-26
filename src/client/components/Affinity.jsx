import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        const listItems = this.state.imageList.map(({url, x, y, maxWidth, maxHeight, dimensions}) => {
            const wscale = maxWidth / dimensions.width;
            const hscale = maxHeight / dimensions.height;
            const scale = Math.min(wscale, hscale);
            const w = scale * dimensions.width;
            const h = scale * dimensions.height;
            const props = {
                url,
                x: x,
                y: y,
                width: w,
                height: h,
                key: url,
            };
            return (
                <ImageItem {...props} />
            );
        });
        return (<div>{listItems}</div>);
    }
}

Affinity.propTypes = {
    imageList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
