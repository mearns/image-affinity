import React from 'react';
import {ImageItem} from './ImageItem';
import {connect} from 'react-redux';

const propTypes = {
    itemList: React.PropTypes.array,
    getImageItemDispatch: React.PropTypes.func,
    handleMouseMove: React.PropTypes.func
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
        return (
            <div
                style={{width: '100%', height: '100%'}}
                onMouseMove={this.props.handleMouseMove}
            >{itemList}
            </div>
        );
    }
}
_Affinity.propTypes = propTypes;

function getListItemsFromState(state) {
    return Object.keys(state.imageSet).map((itemKey) => {
        const item = state.imageSet[itemKey];
        return Object.assign({}, item, {itemKey});
    });
}

const mapStateToProps = (state) => {
    return {
        itemList: getListItemsFromState(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleMouseMove: (event) => {
            dispatch({
                type: 'mouse-move',
                payload: {
                    pos: {
                        x: event.clientX,
                        y: event.clientY
                    }
                }
            });
        },

        getImageItemDispatch: (itemKey) => {
            return ({type, itemPayload}) => {
                dispatch({type, payload: {itemKey, itemPayload}});
            };
        }
    };
};

export const Affinity = connect(mapStateToProps, mapDispatchToProps)(_Affinity);
