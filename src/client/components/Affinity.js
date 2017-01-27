import React from 'react';
import {ImageItem} from './ImageItem';
import * as reducer from '../reducer';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
        this._reducer = reducer.get();
    }

    dispatch(action) {
        this.setState((oldState) => {
            return this._reducer(oldState, action);
        });
    }

    render() {
        const listItems = Object.keys(this.state.imageSet).map((itemKey) => {
            const imageItem = this.state.imageSet[itemKey];
            const dispatch = function({type, payload}) {
                this.dispatch({itemKey, type, payload});
            }.bind(this);
            const selected = Boolean(this.state.selectedImages[itemKey]);
            return (
                <ImageItem {...imageItem} selected={selected} dispatch={dispatch} key={itemKey} />
            );
        });
        return (<div>{listItems}</div>);
    }
}

Affinity.propTypes = {
    imageSet: React.PropTypes.object.isRequired
};