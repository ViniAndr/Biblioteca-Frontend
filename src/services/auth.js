import api from "./api";

// Função para login
export const ClientLogin = async (email, password, login) => {
  try {
    const response = await api.post("/client/login", { email, password });
    const { token } = response.data;

    if (token) {
      login(token); // Decodifica e armazena o token no contexto
    }

    return { error: false, message: "Login efetuado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Usuário não encontrado. Por favor, verifique as informações." };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const EmployeeAndAdminLogin = async (email, password, login) => {
  try {
    const response = await api.post("/employee/login", { email, password });
    const { token } = response.data;

    if (token) {
      login(token);
    }

    return { error: false, message: "Login efetuado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Usuário não encontrado. Por favor, verifique as informações." };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const createFullClient = async (clientData, login) => {
  try {
    const response = await api.post(`client/create`, clientData);
    const { token } = response.data;

    if (token) {
      login(token);
    }

    return { error: false, message: "Cliente cadastrado com sucesso." };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: true, message: "Cliente já cadastrado" };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};

export const handleCreateClient = async (clientData, login) => {
  try {
    const response = await api.post(`/client/verify`, clientData);
    const { token } = response.data;
    if (token) {
      login(token);
    }
  } catch (error) {
    const status = error.response?.status;

    if (status === 404) {
      return {
        error: true,
        status: status,
        message: "Verificamos que você não tem cadastro presencial. Faça o cadastramento completo aqui.",
      };
    } else if (status === 400) {
      return { error: true, status: status, message: "Cliente já cadastrado, tente fazer login" };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
