import { useNavigate } from "react-router-dom";

const Button = ({ text, to, variant, size, disabled = false, onClick, type }) => {
  const navigate = useNavigate();

  const sizes = {
    full: "w-full py-2 px-4 text-base",
    md: "w-auto py-2 px-4 text-base",
    sm: "w-auto py-1 px-2 text-sm",
  };

  // Definindo as classes base
  const baseClass = `text-white text-center font-bold rounded ${sizes[size] || sizes.md}`;

  // Definindo classes variantes
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600", // Botão azul
    cancel: "bg-red-500 hover:bg-red-600", // Botão de cancelar (vermelho)
    back: "bg-gray-500 hover:bg-gray-600", // Botão de voltar (cinza)
  };

  // Classe final do botão baseada na variante e disabled
  const disabledClass = disabled
    ? "bg-gray-400 cursor-not-allowed flex justify-center"
    : variants[variant] || variants.primary;

  function handleClick() {
    if (to && !disabled) {
      navigate(to);
    }
  }

  return (
    <button
      className={`${disabledClass} ${baseClass}`}
      onClick={onClick || handleClick}
      disabled={disabled}
      type={type || ""}
    >
      {disabled ? (
        <span className="flex items-center">
          {/* Imagen do Loading */}
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
