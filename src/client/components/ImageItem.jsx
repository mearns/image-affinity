import React from 'react';

export class ImageItem extends React.Component {
    render() {
        const MAX_WIDTH=300;
        const MAX_HEIGHT=200;
        const left = `${this.props.x}px`;
        const top = `${this.props.y}px`;
        const wscale = MAX_WIDTH / this.props.width;
        const hscale = MAX_HEIGHT / this.props.height;
        // FIXME: XXX: Double check that I'm picking the right one here.
        const scale = Math.min(wscale, hscale);
        const w = scale * this.props.width;
        const h = scale * this.props.height;
        return (
            <img style={{position: 'absolute', left, top}} width={w} height={h} src={this.props.url} />
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
