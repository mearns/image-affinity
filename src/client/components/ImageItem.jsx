import React from 'react';


export class ImageItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch({
            type: 'toggle-image-selected',
            payload: e
        });
    }

    render() {
        const left = `${this.props.pos.x}px`;
        const top = `${this.props.pos.y}px`;
        const border = this.props.selected2 ? '5px solid red' : '1px solid #999';
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
                onClick={this.handleClick}/>
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
    selected2: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
};
