import { Link } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";

// Components
import Button from "../common/Button";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-zinc-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl ">
          Biblioteca
        </Link>

        <div>
          {user ? (
            <>
              {/* Mostrar diferentes opções com base no user.role */}
              {user.role === "cliente" && (
                <>
                  <Link to="/profile/client" className="mr-4">
                    Meu Perfil
                  </Link>
                </>
              )}

              {user.role === "funcionario" && (
                <Link to="/dashboard/employee" className="mr-4">
                  Dashboard Funcionário
                </Link>
              )}

              {user.role === "admin" && (
                <Link to="/dashboard/admin" className="mr-4">
                  Dashboard Admin
                </Link>
              )}

              {/* Botão de logout comum para todos */}
              <Button text="Sair" onClick={logout} />
            </>
          ) : (
            <Button text="Entrar" to="/login/client" />
          )}
        </div>
      </div>
    </header>
  );
}
