// Componentes
import DynamicModal from "../common/DynamicModal";

const BookModal = ({ closeModal, authors, publishers, categories, handleBookCreation }) => {
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

  const onSubmit = async (formData) => {
    formData.availableQuantity = formData.numberOfCopies;
    const isCreate = Boolean(await handleBookCreation(formData));
    // se criar com sucesso fecha o modal
    if (isCreate) closeModal();
  };

  return <DynamicModal fields={fields} onSubmit={onSubmit} onClose={closeModal} />;
};

export default BookModal;
