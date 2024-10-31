import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p className="text-lg mt-4">A página que você está procurando não existe.</p>
      <Link to="/" className="mt-6 text-blue-600 underline">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default PageNotFound;
