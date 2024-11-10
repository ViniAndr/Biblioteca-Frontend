import api from "./api";

export const createBook = async (formData) => {
  try {
    const response = await api.post("book/create", formData);
    return { message: "O livro foi adicionado com sucesso.", book: response.data.book };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: true, message: "Livro já cadastrado, verifique o ISBN" };
    }
    return { error: true, message: "Erro inesperado. Por favor, tente novamente." };
  }
};

export const getAllBooks = async (params, page, itemsPerPage) => {
  let urlBase = `book/all?page=${page}&itemsPerPage=${itemsPerPage}`;

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
