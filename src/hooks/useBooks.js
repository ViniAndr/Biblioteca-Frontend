import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getAllBooks, getAuthors, getPublishers, getCategories, createBook } from "../services/bookService";

export const useBooks = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({ title: "", author: "", category: "", publisher: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Buscar todos os livros
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await getAllBooks(filters, page, itemsPerPage);
      setBooks(data.books || []);
      setTotalPages(data.totalPages);
    } catch (error) {
      showAlert("Erro ao buscar dados. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  // fazer a busca caso use o filtro ou altere a pagina
  useEffect(() => {
    fetchBooks();
  }, [filters, page, itemsPerPage]);

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
      showAlert("Erro ao carregar filtros.", "error");
    }
  };

  // fazer a busca ao acessar a pagina pela primeira vez
  useEffect(() => {
    fetchBookAttributes();
  }, []);

  // Verifica se há espaço disponivel no limit de itens da tela
  const isSpaceAvailable = () => {
    return books.length < itemsPerPage ? true : false;
  };

  const handleBookCreation = async (formData) => {
    setLoading(true);
    try {
      const newBook = await createBook(formData);
      if (newBook.error) {
        return showAlert(newBook.message, "error");
      }

      showAlert(newBook.message, "success");
      if (isSpaceAvailable()) {
        setBooks((prevBooks) => [...prevBooks, newBook.book]);
        // Esses retornos são para informa o BookModal se fecha o Modal
        return true;
      } else {
        setPage((pages) => pages + 1);
        return true;
      }
    } catch (error) {
      showAlert("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    filters,
    setFilters,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    authors,
    publishers,
    categories,
    totalPages,
    loading,
    handleBookCreation,
  };
};
