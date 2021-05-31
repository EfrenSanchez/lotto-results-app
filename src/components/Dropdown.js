import React from 'react';
import useCustomElement from 'use-custom-element';

export const Dropdown = (props) => {
  const [customElementProps, ref] = useCustomElement(props, {
    onChange: 'gh-change'
  });

  return <gh-dropdown ref={ref} {...customElementProps} />;
};