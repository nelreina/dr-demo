import React from 'react';

const List = ({ iterator, of: Component, isobject, ...rest }) => {
  if (isobject) {
    const keys = Object.keys(iterator);
    return keys.map(key => (
      <Component key={key} item={iterator[key]} {...rest} />
    ));
  } else {
    return iterator.map((item, key) => (
      <Component key={key} item={item} {...rest} />
    ));
  }
};

export default List;
