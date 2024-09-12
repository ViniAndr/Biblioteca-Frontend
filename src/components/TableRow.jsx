import Badge from "./Badge";
import Button from "./Button";

import { cancelLoan } from "../services/client";

const TableRow = ({ loan, updateLoanStatus }) => {
  const data = {
    id: loan.id,
    book: loan.livro.titulo,
    requestDate: new Date(loan.dataEmprestimo).toLocaleDateString(),
    returnDate: new Date(loan.dataDevolucao).toLocaleDateString(),
    status: loan.status,
  };

  function badgeColor() {
    switch (data.status) {
      case "Solicitado":
        return "yellow";
      case "Emprestado":
        return "blue";
      case "Devolvido":
        return "green";
      case "Atrasado":
        return "red";
      case "Cancelado":
        return "gray";
      default:
        return "gray";
    }
  }

  function handleCancel(loanId) {
    const confirmCancel = window.confirm("Deseja realmente cancelar este empréstimo?");
    if (confirmCancel) {
      cancelLoan(loanId).then((response) => {
        alert(response.message);
        if (!response.error) {
          updateLoanStatus(loanId, "Cancelado");
        }
      });
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.book}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.requestDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.returnDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Badge color={badgeColor()}>{data.status}</Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {data.status === "Solicitado" && (
          <Button text="Cancelar" variant="cancel" size="sm" onClick={() => handleCancel(data.id)} />
        )}
      </td>
    </tr>
  );
};

export default TableRow;