// Função para formatar telefone
export const formatPhone = (phone) => {
  return phone
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta do DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no número
    .slice(0, 15); // Limita a 15 caracteres (incluindo espaço, parênteses e hífen)
};

// Função para formatar CEP
export const formatCep = (cep) => {
  return cep
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no CEP
    .slice(0, 9); // Limita a 9 caracteres
};

// Função para formatar ISBN
export const formatISBN = (isbn) => {
  // Remove qualquer caractere não numérico
  let digits = isbn.replace(/\D/g, "");

  // Limita a 13 caracteres para o ISBN mais longo
  digits = digits.slice(0, 13);

  // Verifica o comprimento e formata conforme necessário
  if (digits.length <= 10) {
    // Formato para ISBN de 10 dígitos: 85 – 333 – 0227 – 3
    return digits.replace(/(\d{2})(\d{3})(\d{4})(\d{1})/, "$1 – $2 – $3 – $4");
  } else {
    // Formato para ISBN de 13 dígitos: 978–85–333–0227–3
    return digits.replace(/(\d{3})(\d{2})(\d{3})(\d{4})(\d{1})/, "$1–$2–$3–$4–$5");
  }
};
