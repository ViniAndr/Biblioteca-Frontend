import api from "./api";

export const getAllBooks = async (params, page) => {
  let urlBase = `book/all?page=${page}`;

  if (params.title) urlBase += `&title=${params.title}`;
  if (params.author) urlBase += `&author=${params.author}`;
  if (params.category) urlBase += `&category=${params.category}`;
  if (params.publisher) urlBase += `&publisher=${params.publisher}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getAuthors = async (params, page) => {
  let urlBase = page ? `author/all?page=${page}` : "author/all";
  if (params && params.nome) urlBase += `&nome=${params.nome}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getPublishers = async (params, page) => {
  let urlBase = page ? `publisher/all?page=${page}` : "publisher/all";
  if (params && params.nome) urlBase += `&nome=${params.nome}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getCategories = async (params, page) => {
  let urlBase = page ? `category/all?page=${page}` : "category/all";
  if (params && params.nome) urlBase += `&nome=${params.nome}`;

  try {
    const response = await api.get(urlBase);
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};
