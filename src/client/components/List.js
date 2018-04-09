import React from 'react';

const List = ({ iterator, of: Component, ...rest }) => {
  return iterator.map((item, key) => (
    <Component key={key} item={item} {...rest} />
  ));
};

export default List;
