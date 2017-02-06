import React from 'react';
import {ImageItem} from './ImageItem';
import * as reducer from '../reducer';
import {StateStore} from '../../services/state-store';

export class Affinity extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
        this._stateStore = new StateStore(reducer.get());
    }

    dispatch(...actions) {
        this.setState((oldState) => {
            return this._stateStore.dispatch(oldState, ...actions);
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
