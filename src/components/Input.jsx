export default function Input({ id, type = "text", error, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="font-medium leading-none">
        {label}
      </label>
      <input
        className={`h-10 w-full mt-1 rounded-md border px-3 py-2 text-sm ${
          error ? "border-red-500" : "border-grey-300"
        }`}
        id={id}
        type={type}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
