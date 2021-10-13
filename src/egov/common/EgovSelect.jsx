import React from 'react';

import EgovRadioButton from 'egov/common/EgovRadioButton';

function EgovSelect({ id, name, title, options, setValue, setter }) {
    return (
        <select
            id={id}
            name={name}
            title={title}
            // defaultValue={setValue}
            onChange={() => setter(setValue)}>

            {options.map((option, i) => {
                let isSelect = option.value == setValue ? "selected" : "";
                return (
                    <option
                        key={i}
                        value={option.value}
                        selected={isSelect}
                    >
                        {option.label}
                    </option>)
            })}
        </select>
    );
}

export default EgovSelect;