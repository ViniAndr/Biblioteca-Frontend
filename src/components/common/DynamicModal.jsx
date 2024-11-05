import { useState } from "react";

// componentes
import Button from "./Button";
import Input from "../forms/Input";
import Select from "../forms/Select";

// Utils
import { formatISBN } from "../../utils/formatters";
import { validateISBN } from "../../utils/validations";

const DynamicModal = ({ onClose, onSubmit, fields, title = "Formulário" }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Aplica o formato certo
    if (name === "isbn") {
      return setFormData((prevData) => ({ ...prevData, [name]: formatISBN(value) }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validação focada apenas no IBSN Por enquanto
  const validationForm = () => {
    const isbn = validateISBN(formData["isbn"]);
    if (isbn) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isbn: isbn,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationForm();
    if (!errors) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field, i) =>
            field.type === "select" ? (
              <div key={i} className="flex flex-col gap-1">
                {field.label && <p>{field.label}</p>}
                <Select {...field} value={formData[field.name] || ""} onChange={handleChange} />
              </div>
            ) : (
              <>
                <Input
                  key={i}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  error={errors && errors[field.name]}
                  {...field}
                />
              </>
            )
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button text="Cancelar" variant="cancel" onClick={onClose} />
            <Button text="Salvar" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicModal;
