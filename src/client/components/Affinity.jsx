import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        const listItems = this.state.imageList.map((imageItem) => {
            return (
                <ImageItem {...imageItem} />
            );
        });
        return (<div>{listItems}</div>);
    }
}

Affinity.propTypes = {
    imageList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
