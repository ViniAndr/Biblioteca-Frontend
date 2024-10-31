import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Usa o contexto de autenticação

const PrivateRoute = ({ children, allowedRoles }) => {
  const { authenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Enquanto estiver carregando, podemos mostrar um loading
  }

  if (!authenticated) {
    return <Navigate to="/" />; // Redireciona para home se não estiver autenticado
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Se o usuário não tiver a role adequada, redireciona
  }

  return children; // Se tudo estiver certo, renderiza o componente filho
};

export default PrivateRoute;
