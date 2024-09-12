import ShowPasswordToggle from "../ShowPasswordToggle";
import Input from "../Input";

export default function PhoneVerificationForm({ formData, errors, handleInputChange }) {
  return (
    <>
      <Input
        key="email"
        type="email"
        placeholder="Email"
        name="email"
        id="input-email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        label="Email"
      />
      <Input
        key="password"
        type="password"
        placeholder="Senha"
        name="password"
        id="input-password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        label="Senha"
      />
      <ShowPasswordToggle inputId="input-password" />
      <Input
        key="phone"
        type="tel"
        placeholder="Telefone"
        name="phone"
        id="input-phone"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        label="Telefone"
      />
    </>
  );
}
