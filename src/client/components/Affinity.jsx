import React from 'react';
import mapObject from 'lodash.map';

export class Affinity extends React.Component {
    render() {
        const listItems = mapObject(this.props.items, ({url, x, y}) => {
            const left = `${5*x}px`;
            const top = `${5*y}px`;
            return (
                <li key={url}>
                    <img style={{position: 'absolute', left, top}} src={url} />
                </li>
            );
        });
        return (<ul>{listItems}</ul>);
    }
}

Affinity.propTypes = {
    items: React.PropTypes.object
};
