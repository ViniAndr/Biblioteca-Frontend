const Select = ({ name, value, onChange, options = [], defaultOptionLabel, className = "", ...props }) => {
  if (options.length === 0) {
    return (
      <select disabled className={`px-3 py-2 border border-gray-300 rounded-md ${className}`} {...props}>
        <option value="">{defaultOptionLabel || "Carregando..."}</option>
      </select>
    );
  }

  const optionKey = options[0].id ? "id" : "nome";
  const optionLabel = options[0].nome ? "nome" : "titulo";

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`min-w-48 px-3 py-2 border rounded-md${className}`}
      {...props}
    >
      <option value="">{defaultOptionLabel}</option>
      {options.map((option) => (
        <option key={option[optionKey]} value={option[optionKey]}>
          {option[optionLabel]}
        </option>
      ))}
    </select>
  );
};

export default Select;
