export default function Input({ id, type = "text", error, label, required = false, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="font-medium leading-none mb-1">
        {label}
      </label>
      <input
        className={`h-10 w-full rounded-md border px-3 py-2 text-sm ${error ? "border-red-500" : "border-grey-300"}`}
        id={id}
        type={type}
        required={required}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
