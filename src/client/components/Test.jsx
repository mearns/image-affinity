import React from 'react';

export class TestComponent extends React.Component {
    render() {
        const listItems = this.props.imageList.map((item, idx) => (<li key={idx}>{item}</li>));
        return (<ul>{listItems}</ul>);
    }
}

TestComponent.propTypes = {
    imageList: React.PropTypes.array
};
