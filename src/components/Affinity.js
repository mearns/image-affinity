import React from 'react';
import {ImageItem} from './ImageItem';
import {connect} from 'react-redux';

const propTypes = {
    itemList: React.PropTypes.array,
    getImageItemDispatch: React.PropTypes.func
};

class _Affinity extends React.Component {
    render() {
        const itemList = this.props.itemList.map((item) => {
            return (
                <ImageItem
                    {...item}
                    dispatch={this.props.getImageItemDispatch(item.itemKey)}
                    key={item.itemKey}
                    />
                );
        }, this);
        return (<div>{itemList}</div>);
    }
}
_Affinity.propTypes = propTypes;

function getListItemsFromState(state) {
    return Object.keys(state.imageSet).map((itemKey) => {
        const item = state.imageSet[itemKey];
        const selected = Boolean(state.selectedImages[itemKey]);
        return Object.assign({}, item, {selected, itemKey});
    });
}

const mapStateToProps = (state) => {
    return {
        itemList: getListItemsFromState(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getImageItemDispatch: (itemKey) => {
            return ({type, itemPayload}) => {
                dispatch({type, payload: {itemKey, itemPayload}});
            };
        }
    };
};

export const Affinity = connect(mapStateToProps, mapDispatchToProps)(_Affinity);
