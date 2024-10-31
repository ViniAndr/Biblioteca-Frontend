import { useEffect, useState } from "react";
import TableHead from "../tables/TableHead";
import TableBody from "../tables/TableBody"; // Importando o TableBody com tbody
import Pagination from "../common/Pagination";
import FiltersBar from "../common/FiltersBar";
import Alert from "../common/Alert";

import { getAllBooks, getAuthors, getPublishers, getCategories } from "../../services/bookService";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const columns = ["Título", "Autor", "Editora", "Categoria", "Quantidade", "Quantidade Disponível", ""];
  const fields = [
    "titulo", // Coluna com a chave "titulo" do livro
    (book) => book.autor.nome, // Função para pegar o nome do autor
    (book) => book.editora.nome, // Função para pegar o nome da editora
    (book) => book.categoria.nome, // Função para pegar o nome da categoria
    "qtdCopias", // Coluna para quantidade de cópias
    "qtdDisponivel", // Coluna para quantidade disponível
  ];

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    category: "",
    publisher: "",
  });

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await getAllBooks({ ...filters }, page);

      setBooks(data.books);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      setAlert({ message: "Ocorreu um erro ao buscar os dados. Tente novamente", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterData = async () => {
    const [authorResponse, publisherResponse, categoryResponse] = await Promise.all([
      getAuthors(),
      getPublishers(),
      getCategories(),
    ]);
    setAuthors(authorResponse.data);
    setPublishers(publisherResponse.data);
    setCategories(categoryResponse.data);
  };

  useEffect(() => {
    fetchBooks();
    fetchFilterData();
  }, []);

  useEffect(() => {
    fetchBooks();
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
      name: "author",
      options: authors,
      defaultOptionLabel: "Todos os Autores",
    },
    {
      name: "publisher",
      options: publishers,
      defaultOptionLabel: "Todas as Editoras",
    },
    {
      name: "category",
      options: categories,
      defaultOptionLabel: "Todas as Categorias",
    },
  ];

  return (
    <div>
      <FiltersBar
        filters={filters}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        selects={selectFilters}
        textButton="Cadastrar Livro"
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
              ) : books.length === 0 ? (
                <div className="p-5 text-center">Nenhum cliente encontrado</div> // Mensagem se não houver clientes
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <TableHead columns={columns} />
                    <TableBody data={books} fields={fields} />
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

export default Books;
