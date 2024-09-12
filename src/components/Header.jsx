import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// components
import Button from "../components/Button";

export default function Header() {
  // Estado para verificar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para verificar se o token é válido (não expirado)
  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Decodifica o token
      const currentTime = Date.now() / 1000; // Obtém o tempo atual em segundos
      return decodedToken.exp > currentTime; // Verifica se o token ainda não expirou
    } catch (error) {
      return false; // Se houver algum erro na decodificação, trata o token como inválido
    }
  };

  // Verifica se o token existe no localStorage e se é válido
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true); // Usuário autenticado se o token existir e for válido
    } else {
      setIsAuthenticated(false); // Usuário não autenticado se o token não for válido ou não existir
      localStorage.removeItem("token"); // Remove o token inválido, se houver
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

        <div>
          {isAuthenticated ? (
            <>
              <Link to="/perfil/cliente" className="mr-4">
                Meu Perfil
              </Link>
              <Button text="Sair" onClick={handleLogout} />
            </>
          ) : (
            <Button text="Entrar" to="/login" />
          )}
        </div>
      </div>
    </header>
  );
}
