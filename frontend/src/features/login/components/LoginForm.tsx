import { Mail, Key, LogIn } from "lucide-react";

const LoginForm = () => {
  return (
    <form>
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend">Correo eléctronico</legend>
        <label className="input input-primary">
          <Mail className="w-5 opacity-50" />
          <input
            type="email"
            placeholder="email@dominio.com"
            className="grow"
          />
        </label>
      </fieldset>
      <fieldset className="fieldset mb-6">
        <legend className="fieldset-legend">Contraseña</legend>
        <label className="input input-primary">
          <Key className="w-5 opacity-50" />
          <input type="password" placeholder="Contraseña" className="grow" />
        </label>
      </fieldset>
      <button className="btn btn-block btn-md btn-primary">
        <LogIn className="w-4.5" />
        <span>Iniciar sesión</span>
      </button>
    </form>
  );
};

export { LoginForm };
