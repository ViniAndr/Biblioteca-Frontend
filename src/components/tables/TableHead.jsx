const TableHead = ({ columns }) => {
  const stytleFields = columns.length < 4 ? "text-left" : "text-center";

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${stytleFields}`}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
