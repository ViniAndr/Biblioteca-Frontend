//API
import { EmployeeAndAdminLogin } from "../../services/auth";
import FormLogin from "../../components/forms/FormLogin";

const EmployeeAdminLogin = () => {
  return (
    <>
      <FormLogin type="admin" loginApi={EmployeeAndAdminLogin} />
    </>
  );
};

export default EmployeeAdminLogin;
