import Input from "../Input";
import ShowPasswordToggle from "../ShowPasswordToggle";

export default function CompleteRegistrationForm({ formData, errors, handleInputChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          key="name"
          type="text"
          placeholder="Nome"
          name="name"
          id="input-name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          label="Nome"
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
          label="Sobrenome"
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
        label="E-mail"
      />

      <div class="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2">
        <Input
          key="password"
          id="input-password"
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          label="Senha"
        />
        <div className="md:flex md:items-end md:py-2">
          <ShowPasswordToggle inputId="input-password" />
        </div>
      </div>

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

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          key="street"
          type="text"
          placeholder="Rua"
          name="street"
          id="input-street"
          value={formData.street}
          onChange={handleInputChange}
          error={errors.street}
          label="Rua"
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
          label="Número"
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
        label="Bairro"
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
        label="Cidade"
      />
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          key="state"
          type="text"
          placeholder="Estado"
          name="state"
          id="input-state"
          value={formData.state}
          onChange={handleInputChange}
          error={errors.state}
          label="Estado"
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
          label="CEP"
        />
      </div>
    </div>
  );
}
