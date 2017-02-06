import React from 'react';


export class ImageItem extends React.Component {

    constructor(props) {
        super(props);

        console.log('Object keys:', Object.keys(this)); // eslint-disable-line
        this.handleClick = this.handleClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleClick() {
        this.props.dispatch({
            type: 'toggle-image-selected'
        });
    }

    handleDrag(e) {
        this.props.dispatch({
            type: 'move-selected-items-by',
            payload: {
                event: e
            }
        });
    }

    handleDragStart(e) {
        this.props.dispatch({
            type: 'item-drag-start',
            payload: {
                event: e
            }
        });
    }

    handleDragEnd() {
        this.props.dispatch({
            type: 'item-drag-end'
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
                draggable={true}
                style={style}
                width={this.props.dims.display.width}
                height={this.props.dims.display.height}
                src={this.props.url}
                onClick={this.handleClick}
                onDrag={this.handleDrag}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}/>
        );
    }
}

ImageItem.propTypes = {
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
