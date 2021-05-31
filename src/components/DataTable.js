import React from 'react';
import useCustomElement from 'use-custom-element';
 
import './DataTable.css';

export const DataTable = (props) => {
  const [customElementProps, ref] = useCustomElement(props, {
    widthToCollapse: 'width-to-collapse'
  });
    
  return <gh-datatable {...customElementProps} ref={ref} />;
};