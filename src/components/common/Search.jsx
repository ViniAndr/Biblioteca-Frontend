import { LuSearch } from "react-icons/lu";

const Search = ({ value, onChange, className }) => {
  return (
    <div
      className={`min-w-72 flex justify-between items-center rounded-lg border border-gray-200 shadow-sm p-2 ${className}`}
    >
      <input type="text" value={value} onChange={onChange} placeholder="Pesquisar..." className="outline-none w-full" />
      <div className="">
        <LuSearch />
      </div>
    </div>
  );
};

export default Search;
