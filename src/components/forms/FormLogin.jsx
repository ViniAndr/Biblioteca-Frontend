import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//context
import { useAuth } from "../../contexts/AuthContext";

// Components
import Button from "../common/Button";
import Alert from "../common/Alert";
import ShowPasswordToggle from "./ShowPasswordToggle";
import Input from "./Input";

// Utils
import { validateEmail, validatePassword } from "../../utils/validations";

const FormLogin = ({ type, loginApi }) => {
  const { login } = useAuth();

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // Dados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Para redirecionamento

  // Limpa erros quando o formulário é enviado novamente
  const clearErrorsInputs = () => {
    setErrors({});
  };

  // Funções de evento separadas
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Limpar erros ao tentar submeter
    clearErrorsInputs();

    // Validação dos campos
    const fieldValidators = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (Object.values(fieldValidators).some((error) => error)) {
      setErrors(fieldValidators);
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi(email, password, login);
      if (!response.error) {
        setAlert({ message: response.message, type: "success" });
        // Redirecionar para a página principal após sucesso
        navigate("/");
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
          <h1 className="font-bold text-3xl">{type === "admin" ? "Acesso Restrito" : "Entrar"}</h1>
          <p className="text-zinc-500">
            {type !== "admin" && "Preencha os campos abaixo para poder entrar na sua conta:"}
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-3" onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
            />
            <Input
              id="input-password"
              label="Senha"
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
            />

            {/* Mostrar senha */}
            <ShowPasswordToggle inputId="input-password" />

            <Button size="full" text={loading ? "Processando..." : "Entrar"} disabled={loading} />
          </form>
        </div>
        {type !== "admin" && (
          <>
            <hr className="my-6" />
            <p className="text-zinc-500">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="text-blue-700">
                Clique aqui
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default FormLogin;
