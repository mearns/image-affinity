import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    dispatch(itemKey, signal, payload) {
        console.log('Dispatching:', itemKey, signal, payload);  // eslint-disable-line
    }

    render() {
        const listItems = Object.keys(this.state.imageSet).map((itemKey) => {
            const imageItem = this.state.imageSet[itemKey];
            const dispatch = this.dispatch.bind(this, itemKey);
            return (
                <ImageItem {...imageItem} dispatch={dispatch} key={itemKey} />
            );
        });
        return (<div>{listItems}</div>);
    }
}

Affinity.propTypes = {
    imageSet: React.PropTypes.object.isRequired
};
