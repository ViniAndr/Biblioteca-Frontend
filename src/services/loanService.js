import api from "./api";

export const getAllLoans = async (params, page) => {
  let urlBase = `loan/all?page=${page}`;
  urlBase += params.title ? `&title=${params.title}` : "";
  urlBase += params.client ? `&client=${params.client}` : "";
  urlBase += params.status ? `&status=${params.status}` : "";

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getClientsFromLoans = async () => {
  try {
    const response = await api.get("loan/filter/clients");
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
