import React, { useState, useEffect } from 'react';

function EgovRadioButton({ name, label, value, checkedValue, setter }) {
    const checked = (checkedValue == value) ? "checked" : "";
    const activeClassName = checked ? "f_rdo on" : "f_rdo";
    return (
        <span className={activeClassName}>
            <input
                type="radio"
                name={name}
                value={value}
                title={label}
                checked={checked} 
                onChange={() => setter(value)}
                />
            <em>{label}</em>
        </span>

    );
}

export default EgovRadioButton;