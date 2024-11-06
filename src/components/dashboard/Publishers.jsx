import { useEffect, useState } from "react";

// Componentes
import TableHead from "../tables/TableHead";
import TableBody from "../tables/TableBody";
import FooterTable from "../tables/FooterTable";
import FiltersBar from "../common/FiltersBar";

// Servicos
import { getPublishers } from "../../services/bookService";

const Publishers = () => {
  const columns = ["Editora", ""];
  const fields = ["nome"];

  const [publishers, setPublishers] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itensAmmount, setItensAmmount] = useState(5);

  const fetchPublishers = async () => {
    const { data } = await getPublishers({ ...filters }, page);

    setPublishers(data.data);
    setTotalPages(data.totalPages);
    setPage(data.currentPage);
  };
  useEffect(() => {
    fetchPublishers();
  }, [page, filters, itensAmmount]);

  const handleSearch = (e) => {
    setFilters({ ...filters, nome: e.target.value });
  };

  return (
    <>
      <FiltersBar
        filters={filters}
        handleSearch={handleSearch}
        textButton="Cadastrar Editora"
        functionButton={() => "teste"}
      />

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <TableHead columns={columns} />
                <TableBody data={publishers} fields={fields} view={false} />
              </table>

              <FooterTable
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                itemsPerPage={itensAmmount}
                setItemsPerPage={setItensAmmount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publishers;
