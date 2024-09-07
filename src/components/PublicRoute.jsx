import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  // Verifica se o token está no localStorage
  const token = localStorage.getItem("token");

  // Se o token existir (usuário autenticado), redireciona para a página inicial
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Se o usuário não estiver autenticado, renderiza a página pública
  return children;
}
