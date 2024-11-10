// hooks
import { useModal } from "../../hooks/useModal";
import { useClients } from "../../hooks/useClients";

// Componentes
import TableHead from "../tables/TableHead";
import TableBody from "../tables/TableBody";
import FooterTable from "../tables/FooterTable";
import FiltersBar from "../common/FiltersBar";
import ClientModal from "../modals/ClientModal";

const Clients = () => {
  const [isVisible, openModal, closeModal] = useModal();

  const {
    clients,
    loading,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    createClientWithEmployee,
  } = useClients();

  const columns = ["Cliente", ""];
  const fields = ["nome"];

  return (
    <>
      <FiltersBar
        filters={filters}
        handleSearch={(e) => setFilters({ ...filters, nome: e.target.value })}
        textButton="Cadastrar Cliente"
        functionButton={openModal}
      />

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              {loading ? (
                <div className="p-5 text-center">Carregando...</div>
              ) : clients.length === 0 ? (
                <div className="p-5 text-center">Nenhum cliente encontrado</div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <TableHead columns={columns} />
                    <TableBody data={clients} fields={fields} />
                  </table>
                  <FooterTable
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* <ClientModal closeModal={closeModal} handleCreated={createClientWithEmployee} /> */}
        {isVisible && <ClientModal closeModal={closeModal} handleCreated={createClientWithEmployee} />}
      </div>
    </>
  );
};

export default Clients;
