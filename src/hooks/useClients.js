import { useState, useEffect } from "react";

// Contextos
import { useAlert } from "../contexts/AlertContext";

// Servicos
import { getAllClients, createSimpleClient } from "../services/clientService";

export const useClients = () => {
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState([]);

  const [filters, setFilters] = useState({ nome: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Buscar Clientes
  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await getAllClients({ ...filters }, page, itemsPerPage);
      data.data.forEach((client) => {
        client.nome = `${client.nome} ${client.sobrenome}`;
      });
      setClients(data.data || []);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      showAlert("Ocorreu um erro ao buscar os dados. Tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, filters, itemsPerPage]);

  const isSpaceAvailable = () => {
    return clients.length < itensAmmount ? true : false;
  };

  const createClientWithEmployee = async (formData) => {
    setLoading(true);
    try {
      const newClient = await createSimpleClient(formData);

      if (newClient.error) {
        return showAlert(newClient.message, "error");
      }

      // Para exibir o nome e sobre nome do cliente na tabela.
      newClient.client.nome = `${newClient.client.nome} ${newClient.client.sobrenome}`;

      showAlert(newClient.message, "success");

      if (isSpaceAvailable) {
        setClients((prevClients) => [...prevClients, newClient.client]);

        return true;
      } else {
        setPage((pages) => pages + 1);

        return true;
      }
    } catch (error) {
      showAlert("Erro inesperado. Por favor, tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    createClientWithEmployee,
  };
};
