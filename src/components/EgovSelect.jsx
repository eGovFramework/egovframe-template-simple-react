function EgovSelect({ id, name, title, options, setValue, setter }) {
  return (
    <select
      id={id}
      name={name}
      title={title}
      defaultValue={setValue}
      onChange={(event) => {
        setter(event.target.value);
      }}
    >
      {options.map((option, i) => {
        return (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export default EgovSelect;
