import { useState } from "react";

// Components
import Alert from "../components/Alert";
import PhoneVerificationForm from "../components/register/PhoneVerificationForm";
import CompleteRegistrationForm from "../components/register/CompleteRegistrationForm";
import PrimaryButton from "../components/PrimaryButton";

// Services
import { handleCreateClient, createFullClient } from "../services/auth";

// Utils
import { validateEmail, validatePassword, validatePhone, validateRequiredField } from "../utils/validations";
import { formatPhone, formatCep } from "../utils/formatters";

export default function Register() {
  // Estado para gerenciar o passo atual do formulário (1: Verificação de Telefone, 2: Cadastro Completo)
  const [step, setStep] = useState(1);
  // Estado para exibir mensagens de alerta
  const [alert, setAlert] = useState({ message: "", type: "" });
  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: "",
  });

  function clearErrorsInputs() {
    setTimeout(() => {
      setErrors({});
    }, 3000);
  }

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Funções de formatação específicas para telefone e CEP
    const formatters = {
      phone: formatPhone,
      cep: formatCep,
    };
    // Formatar o valor se necessário
    const formattedValue = formatters[name] ? formatters[name](value) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // Função para validar os campos do formulário dependendo do passo atual
  const validateForm = (step) => {
    const validations = {
      1: {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        phone: validatePhone(formData.phone),
      },
      2: {
        name: validateRequiredField(formData.name, "Nome"),
        lastname: validateRequiredField(formData.lastName, "Sobrenome"),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        phone: validatePhone(formData.phone),
        street: validateRequiredField(formData.street, "Rua"),
        number: validateRequiredField(formData.number, "Número"),
        neighborhood: validateRequiredField(formData.neighborhood, "Bairro"),
        city: validateRequiredField(formData.city, "Cidade"),
        state: validateRequiredField(formData.state, "Estado"),
        cep: validateRequiredField(formData.cep, "CEP"),
      },
    };
    return validations[step] || {};
  };

  // Função para lidar com o envio do formulário para o step 1 ou 2
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obter erros de validação para o passo atual
    const formErrors = validateForm(step);

    // Se houver erros, atualizar o estado de erros e sair da função
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      clearErrorsInputs();
      return;
    }

    // Limpar erros se não houver nenhum
    setErrors({});

    setLoading(true);

    try {
      let response;

      if (step === 1) {
        // Verificar ou criar o cliente
        response = await handleCreateClient({
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });

        if (response.error) {
          setAlert({ message: response.message, type: "error" });
          // Se o cliente não for encontrado, avançar para o próximo passo
          if (response.status === 404) {
            setStep(2);
          }
        } else {
          setAlert({
            message: `Conta criada com sucesso! Notamos que você já possuia o cadastro na biblioteca.`,
            type: "success",
          });

          // Redirecionar para a home após 5 segundos
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      } else {
        // Cadastrar o cliente com todos os dados
        const clientData = {
          nome: formData.name,
          sobrenome: formData.lastName,
          email: formData.email,
          senha: formData.password,
          telefone: formData.phone,
          logradouro: formData.street,
          numero: formData.number,
          bairro: formData.neighborhood,
          cidade: formData.city,
          estado: formData.state,
          cep: formData.cep,
        };

        response = await createFullClient(clientData);
        if (response?.error) {
          setAlert({ message: response.message, type: "error" });
        } else {
          setAlert({ message: "Conta criada com sucesso!", type: "success" });
          window.location.href = "/";
        }
      }
    } catch {
      // Mensagem de erro para falha inesperada
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
      <div className={`m-auto shadow rounded-md p-8 ${step == 1 ? "w-96" : "w-96 lg:w-auto"}`}>
        <h1 className="font-bold text-3xl">{step === 1 ? "Verificar Telefone" : "Cadastrar"}</h1>
        <p className="my-4 text-zinc-500">
          {step === 1
            ? "Preencha os campos abaixo para podermos verificar se você já tem o cadastro presencial:"
            : "Preencha os campos abaixo para completar o seu cadastro:"}
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {step === 1 ? (
            <PhoneVerificationForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
          ) : (
            <CompleteRegistrationForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
          )}
          <PrimaryButton
            text={loading ? "Processando..." : step === 1 ? "Verificar" : "Cadastrar"}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
}
