import React, { Component } from 'react';

import Item from './Item';
import Filters from './Filters';

class List extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
          select: 'name',
          valueFilter: ""
        };
    }
    
    updateSelect(value){
      this.setState({
        select: value
      })
    }

    updateFilter(value){
      this.setState({
        valueFilter: value
      })
    }

    render() {
      //It is a filter for the selected category
      var displayedItems = this.props.data.filter(function(item) {
          var match = item[this.state.select].toLowerCase()
          .indexOf(this.state.valueFilter.toLowerCase());
          console.log(`var match: ${match}`);
          
          return (match !== -1);
      }.bind(this));

      console.log(`var displayedItems: ${displayedItems}`);

      //Getting the list of items based on a filter
      var item = displayedItems.map((data) => {
            return <Item key = {data.id}
                         name={data.name}
                         email={data.email}
                         phone={data.phone}/>
        });
        
        return (
            <div className="list">
            <Filters 
                updateSelect={this.updateSelect.bind(this)}
                updateFilter={this.updateFilter.bind(this)}
            /><br />
                {item}
            </div>
        );
    }
}
export default List;