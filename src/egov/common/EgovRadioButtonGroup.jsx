import React, { useState, useEffect } from 'react';

import EgovRadioButton from 'egov/common/EgovRadioButton';

function EgovRadioButtonGroup({ name, radioGroup, setValue, setter }) {
    return (
        <>
            {radioGroup.map((radioOption, i) => {
                console.log("radioOption", radioOption);
                return (
                    <EgovRadioButton
                        key={i}
                        name={name}
                        label={radioOption.label}
                        value={radioOption.value}
                        checkedValue={setValue}
                        setter={setter} />)
            })}
        </>
    );
}

export default EgovRadioButtonGroup;