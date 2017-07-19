import React, { Component } from 'react';

class Filters extends Component {

    handleSelectChange(event) {
        this.props.updateSelect(event.target.value);
    }
    handleFilterChange(event){
        this.props.updateFilter(event.target.value);
    }

    render() {
        
        return (
          <form className="form-inline">
            <div className="form-group">
              <select onChange={this.handleSelectChange.bind(this)}
                       className="form-control"
              >
                <option value="name">Name</option>
                <option value="email">E-mail</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" ref="filterInput"
                onChange={this.handleFilterChange.bind(this)}
                placeholder="filter"
                className="form-control" />
            </div>
          </form>
           
        );
    }
}
export default Filters;