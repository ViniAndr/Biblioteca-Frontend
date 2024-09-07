import { useState, useCallback } from "react";

export const useFormError = () => {
  const [error, setError] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const showError = useCallback(
    (message, duration = 3000) => {
      // Limpar timeout anterior se existir
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setError(message);

      // Definir um novo timeout para limpar a mensagem após o período especificado
      const id = setTimeout(() => {
        setError(null);
      }, duration);

      setTimeoutId(id);
    },
    [timeoutId]
  );

  return {
    error,
    showError,
  };
};
