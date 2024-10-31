import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import NoLayout from "./layouts/NoLayout";

// Components (Rotas Protegidas)
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";

// Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ClientLogin from "./pages/auth/ClientLogin";
import AdminLogin from "./pages/auth/EmployeeAdminLogin";
import Register from "./pages/auth/Register";
import ProfileClient from "./pages/profile/ProfileClient";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Página inicial, acessível a todos */}
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />

          {/* Rotas públicas - Login e Registro (somente para usuários não autenticados) */}
          <Route
            path="/login/client"
            element={
              <PublicRoute>
                <DefaultLayout>
                  <ClientLogin />
                </DefaultLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/login/admin"
            element={
              <PublicRoute>
                <DefaultLayout>
                  <AdminLogin />
                </DefaultLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <DefaultLayout>
                  <Register />
                </DefaultLayout>
              </PublicRoute>
            }
          />

          {/* Rotas privadas - Acessíveis apenas para usuários autenticados */}
          <Route
            path="/profile/client"
            element={
              <PrivateRoute allowedRoles={["cliente"]}>
                <DefaultLayout>
                  <ProfileClient />
                </DefaultLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/employee"
            element={
              <PrivateRoute allowedRoles={["funcionario"]}>
                <NoLayout>
                  <Dashboard />
                </NoLayout>
              </PrivateRoute>
            }
          />

          {/* Página 404 sem Header e Footer */}
          <Route
            path="*"
            element={
              <NoLayout>
                <PageNotFound />
              </NoLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
