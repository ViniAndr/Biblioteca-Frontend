import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import ButtonIcon from "../common/ButtonIcon";

const Pagination = ({ page, setPage, total }) => {
  const handleNextPage = () => {
    if (page < total && page < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex gap-8 items-center">
      <ButtonIcon icon={<MdKeyboardDoubleArrowLeft />} onClick={handlePreviousPage} disabled={page === 1} />
      <span>
        Página {page} de {total}
      </span>
      <ButtonIcon icon={<MdKeyboardDoubleArrowRight />} onClick={handleNextPage} disabled={page === total} />
    </div>
  );
};

export default Pagination;
