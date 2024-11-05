import DynamicModal from "../common/DynamicModal";

// Utils
import { validateISBN } from "../../utils/validations";

const BookModal = ({ closeModal, authors, publishers, categories }) => {
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

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return <DynamicModal fields={fields} onSubmit={onSubmit} onClose={closeModal} />;
};

export default BookModal;
