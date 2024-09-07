import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import PrimaryButton from "../components/PrimaryButton";

export default function Header() {
  // Estado para verificar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o token existe no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Usuário autenticado se o token existir
    } else {
      setIsAuthenticated(false); // Usuário não autenticado se não houver token
    }
  }, []);

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado para não autenticado
    window.location.href = "/"; // Redireciona para a home
  };

  return (
    <header className="bg-zinc-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl ">
          Biblioteca
        </Link>

        {isAuthenticated ? (
          <PrimaryButton text="Sair" onClick={handleLogout} />
        ) : (
          <PrimaryButton text="Entrar" to="/login" />
        )}
      </div>
    </header>
  );
}
