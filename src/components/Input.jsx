export default function Input({ id, type = "text", error, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>{" "}
      {/* Adicionando acessibilidade */}
      <input
        className={`w-full px-3 py-2 rounded-md border ${
          error ? "border-red-500" : "border-grey-300"
        } focus:outline-none focus:ring-blue-500 focus:border-blue-500 `}
        id={id}
        type={type}
        aria-invalid={!!error} // Adicionando atributo de acessibilidade
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
