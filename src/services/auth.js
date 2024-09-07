// src/services/auth.js
import api from "./api";

// Função para login
export const login = async (email, password) => {
  try {
    const response = await api.post("/client/login", { email, password });

    const { token } = response.data;
    // Armazena o token no localStorage
    if (token) {
      localStorage.setItem("token", token);
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

// Função para logout
export const logout = () => {
  localStorage.removeItem("token");
};

export const createFullClient = async (clientData) => {
  try {
    const response = await api.post(`client/create`, clientData);
    // Captura o token da resposta
    const { token } = response.data;

    // Armazena o token no localStorage
    if (token) {
      localStorage.setItem("token", token);
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

export const handleCreateClient = async (clientData) => {
  try {
    const response = await api.post(`/client/verify`, clientData);

    const { token } = response.data;

    // Armazena o token no localStorage
    if (token) {
      localStorage.setItem("token", token);
    }
  } catch (error) {
    const status = error.response.status;

    if (error.response && status === 404) {
      return {
        error: true,
        status: status,
        message: "Verificamos que você não tem cadastro presencial. Faça o cadastramento completo aqui.",
      };
    } else if (error.response && status === 400) {
      return { error: true, status: status, message: "Cliente já cadastrado, tente fazer login" };
    } else {
      return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
    }
  }
};
