import Search from "../common/Search";
import Select from "../common/Select";
import Button from "./Button";

const FiltersBar = ({ filters, handleSearch, handleFilterChange, selects, textButton, functionButton }) => {
  return (
    <div className="flex gap-4 my-4">
      <Search className="flex-grow" value={filters.title} onChange={handleSearch} />

      {handleFilterChange &&
        selects.map((select) => (
          <Select
            key={select.name}
            name={select.name}
            value={filters[select.name]}
            onChange={handleFilterChange}
            options={select.options}
            defaultOptionLabel={select.defaultOptionLabel}
          />
        ))}
      <Button text={textButton} onClick={functionButton} />
    </div>
  );
};

export default FiltersBar;
