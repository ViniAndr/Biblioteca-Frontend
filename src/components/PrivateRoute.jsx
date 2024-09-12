import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // Decodifica o token
    const currentTime = Date.now() / 1000; // Tempo atual em segundos
    return decoded.exp > currentTime; // Verifica se o token ainda não expirou
  } catch (error) {
    return false; // Se der erro ao decodificar, considera o token inválido
  }
};

// Componente PrivateRoute para proteger rotas
const PrivateRoute = ({ children }) => {
  // Se o token for válido, renderiza o componente filho (rota protegida)
  if (isTokenValid()) {
    return children;
  }

  // Se o token for inválido ou não existir, redireciona para a página de login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
