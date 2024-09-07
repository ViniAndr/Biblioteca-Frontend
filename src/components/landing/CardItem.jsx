export default function CardItem({ title, description, icon: Icon }) {
  return (
    <div className="p-4 bg-white shadow-none rounded-lg">
      <div className="p-2 bg-zinc-800 w-10 h-10 rounded">
        <Icon className="text-white w-full h-full" />
      </div>
      <h3 className="text-2xl font-semibold my-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
