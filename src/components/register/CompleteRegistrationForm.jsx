import Input from "../Input";
import ShowPasswordToggle from "../ShowPasswordToggle";

export default function CompleteRegistrationForm({ formData, errors, handleInputChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Coluna 01 */}
      <div className="w-96 flex flex-col gap-3">
        <div className="flex gap-3">
          <Input
            key="name"
            type="text"
            placeholder="Nome"
            name="name"
            id="input-name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            label="Nome" // Adicionando acessibilidade
          />
          <Input
            key="lastName"
            type="text"
            placeholder="Sobrenome"
            name="lastName"
            id="input-lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            label="Sobrenome" // Adicionando acessibilidade
          />
        </div>
        <Input
          key="email"
          type="email"
          placeholder="E-mail"
          name="email"
          id="input-email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          label="E-mail" // Adicionando acessibilidade
        />

        <Input
          key="password"
          id="input-password"
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          label="Senha" // Adicionando acessibilidade
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
          label="Telefone" // Adicionando acessibilidade
        />
      </div>

      {/* Coluna 02 */}
      <div className="w-96 flex flex-col gap-3">
        <div className="flex gap-3">
          <Input
            key="street"
            type="text"
            placeholder="Rua"
            name="street"
            id="input-street"
            value={formData.street}
            onChange={handleInputChange}
            error={errors.street}
            label="Rua" // Adicionando acessibilidade
          />
          <Input
            key="number"
            type="text"
            placeholder="Número"
            name="number"
            id="input-number"
            value={formData.number}
            onChange={handleInputChange}
            error={errors.number}
            label="Número" // Adicionando acessibilidade
          />
        </div>
        <Input
          key="neighborhood"
          type="text"
          placeholder="Bairro"
          name="neighborhood"
          id="input-neighborhood"
          value={formData.neighborhood}
          onChange={handleInputChange}
          error={errors.neighborhood}
          label="Bairro" // Adicionando acessibilidade
        />
        <Input
          key="city"
          type="text"
          placeholder="Cidade"
          name="city"
          id="input-city"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          label="Cidade" // Adicionando acessibilidade
        />
        <Input
          key="state"
          type="text"
          placeholder="Estado"
          name="state"
          id="input-state"
          value={formData.state}
          onChange={handleInputChange}
          error={errors.state}
          label="Estado" // Adicionando acessibilidade
        />
        <Input
          key="cep"
          type="text"
          placeholder="CEP"
          name="cep"
          id="input-cep"
          value={formData.cep}
          onChange={handleInputChange}
          error={errors.cep}
          label="CEP" // Adicionando acessibilidade
        />
      </div>
    </div>
  );
}
