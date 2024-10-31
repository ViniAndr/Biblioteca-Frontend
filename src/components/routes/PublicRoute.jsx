import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <Navigate to="/" />; // Se o usuário estiver logado, redireciona para home
  }

  return children; // Renderiza o componente filho (rota pública, ex.: login)
};

export default PublicRoute;
