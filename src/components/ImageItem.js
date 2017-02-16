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
            'handleMouseDown',
            'handleMouseUp'
        ].forEach((key) => {
            this[key] = this[key].bind(this);
        }, this);
    }

    handleMouseDown(event) {
        if (event.metaKey) {
            this.props.dispatch({
                type: 'select-item-toggle'
            });
        }
        else {
            if (!this.props.selected) {
                this.props.dispatch({
                    type: 'select-item-only'
                });
            }
            this.props.dispatch({
                type: 'drag-item-start',
                itemPayload: {
                    pos: {
                        x: event.clientX,
                        y: event.clientY
                    }
                }
            });
        }
    }

    handleMouseUp() {
        this.props.dispatch({type: 'drag-item-end'});
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
                draggable={false}
                style={style}
                width={this.props.dims.display.width}
                height={this.props.dims.display.height}
                src={this.props.url}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                />
        );
    }
}
ImageItem.propTypes = propTypes;
