import React, { Component } from 'react';

import Item from './Item';

class List extends Component {
    render() {
      var item = this.props.data.map((data) => {
            return <Item key = {data.id}
                         name={data.name}
                         email={data.email}
                         phone={data.phone}/>
        });
        
        return (
            <div className="list">
                {item}
            </div>
        );
    }
}
export default List;