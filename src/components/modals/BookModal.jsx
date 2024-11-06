// Componentes
import DynamicModal from "../common/DynamicModal";

// Contextos
import { useAlert } from "../../contexts/AlertContext";

// Serviços
import { createBook } from "../../services/bookService";

const BookModal = ({ closeModal, authors, publishers, categories, bookControll }) => {
  const { showAlert } = useAlert();

  const fields = [
    { label: "Título", name: "title", required: true },
    { type: "number", label: "Quantidade de Cópias", name: "numberOfCopies", required: true, max: 999, min: 0 },
    { type: "number", label: "Edição", name: "edition", max: 99, min: 1 },
    { label: "ISBN", name: "isbn", required: true },
    {
      type: "select",
      label: "Selecione um Autor",
      name: "authorId",
      options: authors,
      defaultOptionLabel: "Todos os Autores",
      required: true,
    },
    {
      type: "select",
      label: "Selecione uma Editora",
      name: "publisherId",
      options: publishers,
      defaultOptionLabel: "Todos as Editoras",
      required: true,
    },
    {
      type: "select",
      label: "Selecione uma Categoria/Gênero",
      name: "categoryId",
      options: categories,
      defaultOptionLabel: "Todos as Categorias",
      required: true,
    },
  ];

  // Verifica se há espaço disponivel no limit de itens da tela
  const isSpaceAvailable = () => {
    return bookControll.books.length < bookControll.itensAmmount ? true : false;
  };

  const onSubmit = async (formData) => {
    formData.availableQuantity = formData.numberOfCopies;
    try {
      const book = await createBook(formData);
      if (!book.error) {
        showAlert(book.message, "success");
        if (isSpaceAvailable()) {
          bookControll.setBooks((prev) => [...prev, book.book]);
        }
        closeModal();
      } else {
        showAlert(book.message, "error");
      }
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    }
  };

  return <DynamicModal fields={fields} onSubmit={onSubmit} onClose={closeModal} />;
};

export default BookModal;
