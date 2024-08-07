import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = ({ message = 'Default Message', author = 'Default Author'  }) => {
  return (
    <div>
      <h2>Child Component</h2>
      <p>{message}</p>
      <p>Author: {author}</p>
    </div>
  );
};

ChildComponent.propTypes = {
  message: PropTypes.string,
  author: PropTypes.string,
};

/*ChildComponent.defaultProps = { //we can use this but It will be removed in future
  message: 'Default Message',
  author: 'Default Author',
};*/

export default ChildComponent;
