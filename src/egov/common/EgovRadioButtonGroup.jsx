import React from 'react';

import EgovRadioButton from 'egov/common/EgovRadioButton';

const EgovRadioButtonGroup = ({ name, radioGroup, setValue, setter }) => {
  return (
    <>
      {radioGroup.map((radioOption, i) => {
        return (
          <EgovRadioButton
            key={i}
            name={name}
            label={radioOption.label}
            value={radioOption.value}
            checkedValue={setValue}
            setter={setter}
          />
        );
      })}
    </>
  );
};

export default EgovRadioButtonGroup;
