import { useState } from "react";

// Componentes
import TableHead from "../tables/TableHead";
import TableBody from "../tables/TableBody";
import FiltersBar from "../common/FiltersBar";
import BookModal from "../modals/BookModal";
import FooterTable from "../tables/FooterTable";

// Hooks
import useBooks from "../../hooks/useBooks";
import { useModal } from "../../hooks/useModal";

const Books = () => {
  const [isVisible, openModal, closeModal] = useModal();
  const [filters, setFilters] = useState({ title: "", author: "", category: "", publisher: "" });
  const [page, setPage] = useState(1);

  const { books, setBooks, itensAmmount, setItensAmmount, authors, publishers, categories, totalPages, loading } =
    useBooks(filters, page);

  const columns = ["Título", "Autor", "Editora", "Categoria", "Quantidade", "Quantidade Disponível", ""];
  const fields = [
    "titulo", // Coluna com a chave "titulo" do livro
    (book) => book.autor.nome, // Função para pegar o nome do autor
    (book) => book.editora.nome, // Função para pegar o nome da editora
    (book) => book.categoria.nome, // Função para pegar o nome da categoria
    "qtdCopias", // Coluna para quantidade de cópias
    "qtdDisponivel", // Coluna para quantidade disponível
  ];

  const selectFilters = [
    { name: "author", options: authors, defaultOptionLabel: "Todos os Autores" },
    { name: "publisher", options: publishers, defaultOptionLabel: "Todas as Editoras" },
    { name: "category", options: categories, defaultOptionLabel: "Todas as Categorias" },
  ];

  const handleFilterChange = (e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div>
      <FiltersBar
        filters={filters}
        handleSearch={(e) => setFilters({ ...filters, title: e.target.value })}
        handleFilterChange={handleFilterChange}
        fieldsSelect={selectFilters}
        textButton="Cadastrar Livro"
        functionButton={openModal}
      />

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              {loading ? (
                <div className="p-5 text-center">Carregando...</div>
              ) : alert.message ? (
                <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
              ) : books.length === 0 ? (
                <div className="p-5 text-center">Nenhum cliente encontrado</div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <TableHead columns={columns} />
                    <TableBody data={books} fields={fields} />
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

      {isVisible && (
        <BookModal
          closeModal={closeModal}
          authors={authors}
          publishers={publishers}
          categories={categories}
          bookControll={{ books, setBooks, itensAmmount }}
        />
      )}
    </div>
  );
};

export default Books;
