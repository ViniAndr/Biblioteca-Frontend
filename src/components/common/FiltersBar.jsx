// Componentes
import Search from "../common/Search";
import Select from "../forms/Select";
import Button from "./Button";

const FiltersBar = ({ filters, handleSearch, handleFilterChange, fieldsSelect, textButton, functionButton }) => {
  return (
    <div className="flex gap-4 my-4">
      {/* Barra de Busca */}
      <Search className="flex-grow" value={filters.title} onChange={handleSearch} />
      {/* Selects de Filtros */}
      {fieldsSelect &&
        fieldsSelect.map((field) => (
          <Select key={field.name} {...field} value={filters[field.name]} onChange={handleFilterChange} />
        ))}
      {/* Botão Para criar algo */}
      <Button text={textButton} onClick={functionButton} />
    </div>
  );
};

export default FiltersBar;
