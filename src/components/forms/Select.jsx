const Select = ({
  name,
  value,
  onChange,
  options = [],
  defaultOptionLabel = "Selecione uma opção",
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded ${className}`}
      required={required}
      disabled={disabled}
    >
      <option value="">{defaultOptionLabel}</option>
      {options.map((option) => (
        <option key={option.id || option.nome} value={option.value || option.id}>
          {option.nome}
        </option>
      ))}
    </select>
  );
};

export default Select;
