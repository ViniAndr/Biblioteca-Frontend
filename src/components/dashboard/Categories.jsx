import { useEffect, useState } from "react";

// Contextos
import { useAlert } from "../../contexts/AlertContext";

// Componentes
import TableHead from "../tables/TableHead";
import TableBody from "../tables/TableBody";
import FooterTable from "../tables/FooterTable";
import FiltersBar from "../common/FiltersBar";

// Servicos
import { getCategories } from "../../services/bookService";

const Categories = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);

  const columns = ["Categoria", ""];
  const fields = ["nome"];

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itensAmmount, setItensAmmount] = useState(5);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await getCategories({ ...filters }, page);

      setCategories(data.data);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, filters, itensAmmount]);

  const handleSearch = (e) => {
    setFilters({ ...filters, nome: e.target.value });
  };

  return (
    <>
      <FiltersBar
        filters={filters}
        handleSearch={handleSearch}
        textButton="Cadastrar Categoria"
        functionButton={() => "teste"}
      />

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              {loading ? (
                <div className="p-5 text-center">Carregando...</div> // Spinner ou mensagem de carregamento
              ) : categories.length === 0 ? (
                <div className="p-5 text-center">Nenhum cliente encontrado</div> // Mensagem se não houver clientes
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <TableHead columns={columns} />
                    <TableBody data={categories} fields={fields} view={false} />
                  </table>
                  <FooterTable
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    itemsPerPage={itensAmmount}
                    setItemsPerPage={setItensAmmount}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
