const ButtonIcon = ({ icon, onClick, variant, text, disabled = false }) => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white", // Botão azul
    secondary: "border text-zinc-800 hover:bg-zinc-100", // Botão de voltar (cinza)
    delete: "bg-red-500 hover:bg-red-600 text-white", // Botão de cancelar (vermelho)
  };

  const disabledClass = disabled ? "bg-gray-400 cursor-not-allowed text-white" : variants[variant] || variants.primary;

  return (
    <button
      className={`flex items-center justify-center rounded w-8 h-8 gap-1 ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
};

export default ButtonIcon;
