import React from 'react';

const propTypes = {
    url: React.PropTypes.string.isRequired,
    pos: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }),
    dims: React.PropTypes.shape({
        orig: React.PropTypes.shape({
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        }),
        display: React.PropTypes.shape({
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        })
    }),
    selected: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export class ImageItem extends React.Component {
    constructor(props) {
        super(props);

        [
            'handleOnClick',
            'handleDragStart',
            'handleDrag',
            'handleDragEnd'
        ].forEach((key) => {
            this[key] = this[key].bind(this);
        }, this);
    }

    handleOnClick(event) {
        if (event.altKey) {
            this.props.dispatch({type: 'toggle-select-item'});
        }
        else {
            this.props.dispatch({type: 'toggle-select-only-item'});
        }
    }

    handleDragStart(event) {
        this.props.dispatch({
            type: 'item-drag-start',
            itemPayload: {
                pos: {
                    x: event.clientX,
                    y: event.clientY
                }
            }
        });
    }

    handleDragEnd() {
        this.props.dispatch({type: 'item-drag-end'});
    }

    handleDrag(event) {
        this.props.dispatch({
            type: 'item-drag',
            itemPayload: {
                pos: {
                    x: event.clientX,
                    y: event.clientY
                },
                event
            }
        });
    }

    render() {
        const left = `${this.props.pos.x}px`;
        const top = `${this.props.pos.y}px`;
        const border = this.props.selected ? '5px solid blue' : '1px solid #999';
        const style = {
            position: 'absolute',
            border,
            left,
            top
        };
        return (
            <img
                style={style}
                width={this.props.dims.display.width}
                height={this.props.dims.display.height}
                src={this.props.url}
                onClick={this.handleOnClick}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDrag={this.handleDrag}
                />
        );
    }
}
ImageItem.propTypes = propTypes;
