import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Loans from "../../components/dashboard/Loans";
import Books from "../../components/dashboard/Books";
import Authors from "../../components/dashboard/Authors";
import Publishers from "../../components/dashboard/Publishers";
import Categories from "../../components/dashboard/Categories";
import Clients from "../../components/dashboard/Clients";
import Employees from "../../components/dashboard/Employees";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Emprestimos");

  const renderContent = () => {
    switch (activeTab) {
      case "Emprestimos":
        return <Loans />;
      case "Livros":
        return <Books />;
      case "Autores":
        return <Authors />;
      case "Editoras":
        return <Publishers />;
      case "Categorias":
        return <Categories />;
      case "Clientes":
        return <Clients />;
      case "Funcionarios":
        return <Employees />;
      default:
        return <Loans />;
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="lg:container mx-auto p-6">
        <h1 className="font-bold text-4xl mb-2">{activeTab}</h1>
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
