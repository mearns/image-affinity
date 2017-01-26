import React from 'react';

export class ImageItem extends React.Component {
    render() {
        const left = `${this.props.x}px`;
        const top = `${this.props.y}px`;
        const style = {
            position: 'absolute',
            border: '1px solid white',
            left,
            top
        };
        return (
            <img style={style} width={this.props.width} height={this.props.height} src={this.props.url} />
        );
    }
}

ImageItem.propTypes = {
    url: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
};
