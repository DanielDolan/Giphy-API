import React, { Component } from "react";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.props.search(e.target.value);
  };

  render() {
    return (
      <div className="mb-4">
        <form action="" className="formsearch">
          <input
            type="text"
            className="form-control mr-4"
            placeholder="Please enter a GIF to search for"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default SearchField;