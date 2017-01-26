import React from 'react';
import {ImageItem} from './ImageItem.jsx';
// import mapObject from 'lodash.map';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    dispatch({itemKey, signal}) {
        switch(signal) {
            case 'toggle-image-selected':
                this.setState((oldState) => {
                    oldState.imageSet[itemKey].selected = !oldState.imageSet[itemKey].selected;
                    return oldState;
                });
            break;
        }
    }

    render() {
        const listItems = Object.keys(this.state.imageSet).map((itemKey) => {
            const imageItem = this.state.imageSet[itemKey];
            const dispatch = function({signal, payload}) {
                this.dispatch({itemKey, signal, payload});
            }.bind(this);
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
