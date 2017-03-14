import React from 'react';
import {ImageItem} from './ImageItem';
import {connect} from 'react-redux';

const propTypes = {
    dirty: React.PropTypes.string,
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
        const style = {
            width: '100%',
            height: '100%'
        };
        switch (this.props.dirty) {
            case 'dirty': {
                style.border = '2px solid yellow';
            } break;

            case 'saved': {
                style.border = '2px solid green';
            } break;

            case 'erred': {
                style.border = '2px solid red';
            } break;

            default: {
                style.border = '2px solid gray';
            } break;
        }
        return (
            <div
                style={style}
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
        itemList: getListItemsFromState(state),
        dirty: state.dirty
    };
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
