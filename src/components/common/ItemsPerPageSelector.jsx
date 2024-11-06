const ItemsPerPageSelector = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="itemsPerPage" className="mr-2">
        Itens por página:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {[5, 10, 15, 20].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
