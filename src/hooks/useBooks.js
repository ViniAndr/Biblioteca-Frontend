import { useState, useEffect } from "react";
import { getAllBooks, getAuthors, getPublishers, getCategories } from "../services/bookService";

const useBooks = (filters, page) => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Buscar todos os livros
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await getAllBooks(filters, page);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      setAlert({ message: "Erro ao buscar dados. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Buscar todos os dados para o filtro funcionar
  const fetchBookAttributes = async () => {
    try {
      const [authorResponse, publisherResponse, categoryResponse] = await Promise.all([
        getAuthors(),
        getPublishers(),
        getCategories(),
      ]);
      setAuthors(authorResponse.data);
      setPublishers(publisherResponse.data);
      setCategories(categoryResponse.data);
    } catch (error) {
      setAlert({ message: "Erro ao carregar filtros.", type: "error" });
    }
  };

  // fazer a busca caso use o filtro ou altere a pagina
  useEffect(() => {
    fetchBooks();
  }, [filters, page]);

  // fazer a busca ao acessar a pagina pela primeira vez
  useEffect(() => {
    fetchBookAttributes();
  }, []);

  return {
    books,
    authors,
    publishers,
    categories,
    totalPages,
    loading,
    alert,
    setAlert,
  };
};

export default useBooks;
