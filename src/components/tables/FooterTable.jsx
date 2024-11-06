import Pagination from "../common/Pagination";
import ItemsPerPageSelector from "../common/ItemsPerPageSelector";

const FooterTable = ({ page, setPage, totalPages, itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="flex justify-between py-2 px-6 border-t bg-gray-50 ">
      <ItemsPerPageSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
      <Pagination page={page} setPage={setPage} total={totalPages} />
    </div>
  );
};

export default FooterTable;
