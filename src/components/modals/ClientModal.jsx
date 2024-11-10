// Componentes
import DynamicModal from "../common/DynamicModal";

const ClientModal = ({ closeModal, handleCreated }) => {
  const fields = [
    { label: "Nome", name: "name", required: true },
    { label: "Sobrenome", name: "lastName", required: true },

    { label: "Telefone", type: "tel", name: "phone", required: true },
    { label: "Rua", name: "street", required: true },
    { label: "Numero", name: "number", required: false },
    { label: "Bairro", name: "neighborhood", required: true },
    { label: "Cidade", name: "city", required: true },
    { label: "Estado", name: "state", required: true },
    { label: "CEP", name: "cep", required: true },
  ];

  const onSubmit = async (formData) => {
    console.log(formData);
    const isCreate = Boolean(await handleCreated(formData));
    // se criar com sucesso fecha o modal
    if (isCreate) closeModal();
  };

  return <DynamicModal fields={fields} title={"Cliente"} onSubmit={onSubmit} onClose={closeModal} />;
};

export default ClientModal;
