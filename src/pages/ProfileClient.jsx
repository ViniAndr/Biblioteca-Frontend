import { useState, useEffect } from "react";

import Input from "../components/Input";
import PrimaryButton from "../components/Button";
import ExpandableSection from "../components/ExpandableSection";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import Alert from "../components/Alert";

import { getClientProfile, getClientLoans, updateClientProfile, updateClientAddress } from "../services/client";

export default function ProfileClient() {
  const columns = ["Nome do Livro", "Data de Solicitação", "Data de Devolução", "Status", ""];

  const [personalInfo, setPersonalInfo] = useState({});

  const [addressInfo, setAddressInfo] = useState({});

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const [loanHistory, setLoanHistory] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do perfil do cliente
    async function fetchClientProfile() {
      setLoading(true);
      setAlert({ message: "", type: "" });
      try {
        const response = await getClientProfile();
        if (response.error) {
          setAlert({ message: response.message, type: "error" });
        }
        const data = response.data;
        setPersonalInfo({
          name: data.nome || "",
          lastName: data.sobrenome || "",
          email: data.email || "",
          password: "",
          phone: data.telefone || "",
        });
        setAddressInfo({
          street: data.logradouro || "",
          number: data.numero || "",
          neighborhood: data.bairro || "",
          city: data.cidade || "",
          state: data.estado || "",
          cep: data.cep || "",
        });
      } catch (err) {
        setAlert({ message: "Erro inesperado. Por favor, tente novamente. ", type: "error" });
      } finally {
        setLoading(false);
      }
    }

    // função para buscar os empréstimos do cliente
    async function fetchClientLoans() {
      setLoading(true);
      setAlert({ message: "", type: "" });

      try {
        const response = await getClientLoans();

        setLoanHistory(response.data);
      } catch (error) {
        setAlert({ message: "Erro inesperado. Por favor, tente novamente.", type: "error" });
      } finally {
        setLoading(false);
      }
    }

    fetchClientProfile();
    fetchClientLoans();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressInfoChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  const updateLoanStatus = (loanId, newStatus) => {
    setLoanHistory((prevHistory) =>
      prevHistory.map((loan) => (loan.id === loanId ? { ...loan, status: newStatus } : loan))
    );
  };

  async function handleUpdateProfile(e) {
    e.preventDefault();
    const response = await updateClientProfile(personalInfo);
    if (response.error) {
      setAlert({ message: response.message, type: "error" });
    }
    setAlert({ message: response.message, type: "success" });
  }

  async function handleUpdateAddress(e) {
    e.preventDefault();
    const response = await updateClientAddress(addressInfo);
    if (response.error) {
      setAlert({ message: response.message, type: "error" });
    }
    setAlert({ message: response.message, type: "success" });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Coluna de Informações Pessoais */}
        <ExpandableSection title="Informações Pessoais">
          <form className="grid gap-3">
            <div className="flex gap-3">
              <Input
                type="text"
                label="Nome"
                name="name"
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
              <Input
                type="text"
                label="Sobrenome"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <Input
              type="email"
              label="Email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <Input
              type="password"
              label="Senha"
              name="password"
              value={personalInfo.password}
              onChange={handlePersonalInfoChange}
            />
            <Input
              type="text"
              label="Telefone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
            <PrimaryButton onClick={handleUpdateProfile} text="Atualizar Informações Pessoais" disabled={loading} />
          </form>
        </ExpandableSection>

        {/* Coluna de Endereço */}
        <ExpandableSection title="Endereço" className="w-full md:w-1/2">
          <form className="grid gap-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="text"
                label="Logradouro"
                name="street"
                value={addressInfo.street}
                onChange={handleAddressInfoChange}
              />
              <Input
                type="text"
                label="Número"
                name="number"
                value={addressInfo.number}
                onChange={handleAddressInfoChange}
              />
            </div>
            <Input
              type="text"
              label="Bairro"
              name="neighborhood"
              value={addressInfo.neighborhood}
              onChange={handleAddressInfoChange}
            />
            <Input type="text" label="Cidade" name="city" value={addressInfo.city} onChange={handleAddressInfoChange} />
            <Input
              type="text"
              label="Estado"
              name="state"
              value={addressInfo.state}
              onChange={handleAddressInfoChange}
            />
            <Input type="text" label="CEP" name="cep" value={addressInfo.cep} onChange={handleAddressInfoChange} />
            <PrimaryButton onClick={handleUpdateAddress} text="Atualizar Endereço" disabled={loading} />
          </form>
        </ExpandableSection>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Histórico de Empréstimos</h2>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Cabeçalho da Tabela */}
                <TableHead columns={columns} />

                {/* Corpo da Tabela */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {loanHistory.map((loan) => (
                    <TableRow key={loan.id} loan={loan} updateLoanStatus={updateLoanStatus} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
