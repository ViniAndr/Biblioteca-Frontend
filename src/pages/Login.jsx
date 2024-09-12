import { useState } from "react";
import { Link } from "react-router-dom";

//componets
import Button from "../components/Button";
import ShowPasswordToggle from "../components/ShowPasswordToggle";
import Input from "../components/Input";
import Alert from "../components/Alert";

//API
import { login } from "../services/auth";

//Utils
import { validateEmail, validatePassword } from "../utils/validations";

export default function Login() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // Dados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearErrorsInputs() {
    setTimeout(() => {
      setErrors({});
    }, 3000);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação dos campos
    const fieldesValidators = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (Object.values(fieldesValidators).some((error) => error)) {
      setErrors(fieldesValidators);
      clearErrorsInputs();
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);
      if (!response.error) {
        setAlert({ message: response.message, type: "success" });
        // Redirecionar para a home para o header atualizar
        window.location.href = "/";
      } else {
        setAlert({ message: response.message, type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Erro inesperado. Por favor, tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
      )}

      <div className="max-w-[27rem] m-auto mt-8 md:mt-16 rounded-lg border shadow-sm p-8">
        <div className="flex flex-col space-y-1.5 mb-6">
          <h1 className="font-bold text-3xl">Entrar</h1>
          <p className="text-zinc-500">Preencha os campos abaixo para poder entrar na sua conta:</p>
        </div>
        <div>
          <form className="flex flex-col gap-3" onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              id={"input-password"}
              label="Senha"
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            {/* Mostrar senha */}
            <ShowPasswordToggle inputId="input-password" />

            <Button size="full" text={loading ? "Processando..." : "Entrar"} disabled={loading} />
          </form>
        </div>
        <hr className="my-6" />
        <p className="text-zinc-500">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-700">
            Clique aqui
          </Link>
        </p>
      </div>
    </>
  );
}
