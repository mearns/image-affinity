import React from 'react';

export class ImageItem extends React.Component {
    render() {
        const left = `${this.props.x}px`;
        const top = `${this.props.y}px`;
        return (
            <img style={{position: 'absolute', left, top}} src={this.props.url} />
        );
    }
}

ImageItem.propTypes = {
    url: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
};
