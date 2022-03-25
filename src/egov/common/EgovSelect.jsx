import React, { useState } from 'react';
import debug from 'debug';
const log = debug('egov:EgovSelect');

const EgovSelect = (props) => {
  const { id, name, title, options, setValue, setter } = props;
  log({ props });

  return (
    <select
      id={id}
      name={name}
      title={title}
      onChange={() => {
        log('select change:', setValue);
        setter(setValue);
      }}>
      {options.map((option, i) => {
        let isSelect = option.value == setValue ? 'selected' : '';
        //let isSelect = option.value == setValue;
        return (
          <option key={i} value={option.value} selected={isSelect}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default EgovSelect;
