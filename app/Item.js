import React, { Component } from 'react';

class Item extends Component {
    render() {
        
        return (
            <ul className="list-group">
                <li className="list-group-item"><strong>Name:</strong> {this.props.name}</li>
                <li className="list-group-item"><strong>E-mail:</strong> <a href="mailto:#">{this.props.email}</a></li>
                <li className="list-group-item"><strong>Phone number:</strong> {this.props.phone}</li>
                <br />
            </ul>
        );
    }
}
export default Item;