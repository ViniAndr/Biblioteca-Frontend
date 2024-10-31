//API
import { ClientLogin } from "../../services/auth";
import FormLogin from "../../components/forms/FormLogin";

export default function Login() {
  return (
    <>
      <FormLogin type="client" loginApi={ClientLogin} />
    </>
  );
}
