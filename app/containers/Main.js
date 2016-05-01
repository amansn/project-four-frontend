import React from 'react';

const Main = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        {this.props.children}
      </div>
    )
  }
});

export default Main;
