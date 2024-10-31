import api from "./api";

export const getClientProfile = async () => {
  try {
    const response = await api.get("/client/profile");
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Cliente não encontrado." };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getClientLoans = async () => {
  try {
    const response = await api.get("loan/client");
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const cancelLoan = async (loanId) => {
  try {
    await api.put(`loan/${loanId}/cancel`);
    return { error: false, message: "Empréstimo cancelado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Empréstimo não encontrado." };
    } else if (error.response && error.response.status === 400) {
      return { error: true, message: "Este empréstimo não pode ser cancelado." };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const updateClientProfile = async (data) => {
  try {
    await api.put("/client/profile/update", data);
    return { error: false, message: "Perfil atualizado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Cliente não encontrado." };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const updateClientAddress = async (data) => {
  try {
    await api.put("/client/address/update", data);
    return { error: false, message: "Endereço atualizado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Cliente não encontrado." };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getAllClients = async (params, page) => {
  let urlBase = page ? `client/all?page=${page}` : "client/all";
  if (params && params.nome) urlBase += `&nome=${params.nome}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
