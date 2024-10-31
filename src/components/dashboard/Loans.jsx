import { useState, useEffect } from "react";
import TableHead from "../tables/TableHead.jsx";
import TableRow from "../tables/TableRowLoan.jsx";
import Pagination from "../common/Pagination.jsx";
import FiltersBar from "../common/FiltersBar";
import Alert from "../common/Alert";

import { getAllLoans, getClientsFromLoans } from "../../services/loanService.js";

const Loans = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const columns = ["Cliente", "Livro", "Data de Empréstimo", "Data de Devolução", "Status", ""];

  const [loans, setLoans] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    client: "",
    status: "",
  });

  const [clients, setClient] = useState([]);
  const status = ["Solicitado", "Emprestado", "Devolvido", "Atrasado", "Cancelado"];

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const { data } = await getAllLoans({ ...filters }, page);

      setLoans(data.loans);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      setAlert({ message: "Ocorreu um erro ao buscar os dados. Tente novamente", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterData = async () => {
    const clientResponse = await getClientsFromLoans();

    const clients = clientResponse.data.map((item) => ({
      id: item.cliente.id,
      nome: item.cliente.nome,
    }));

    setClient(clients);
  };

  useEffect(() => {
    fetchLoans();
    fetchFilterData();
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, title: e.target.value });
  };

  const selectFilters = [
    {
      name: "client",
      options: clients,
      defaultOptionLabel: "Todos os Clientes",
    },
    {
      name: "status",
      options: status.map((status) => ({ nome: status })),
      defaultOptionLabel: "Todos os Status",
    },
  ];

  return (
    <div>
      <FiltersBar
        filters={filters}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        selects={selectFilters}
        textButton="Criar Empréstimo"
        functionButton={() => "teste"}
      />

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              {loading ? (
                <div className="p-5 text-center">Carregando...</div> // Spinner ou mensagem de carregamento
              ) : alert.message ? (
                <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
              ) : loans.length === 0 ? (
                <div className="p-5 text-center">Nenhum cliente encontrado</div> // Mensagem se não houver clientes
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <TableHead columns={columns} />
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loans.map((loan) => (
                        <TableRow key={loan.id} loan={loan} />
                      ))}
                    </tbody>
                  </table>
                  <Pagination page={page} setPage={setPage} total={totalPages} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
