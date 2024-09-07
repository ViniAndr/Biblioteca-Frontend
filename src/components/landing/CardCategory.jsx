export default function Cards({ title, description, image }) {
  return (
    <div className="max-w-max bg-white shadow-md rounded-lg overflow-hidden hover:scale-105  active:scale-95 transition-transform cursor-pointer">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
