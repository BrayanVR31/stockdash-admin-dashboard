import { LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./label";
import { InputGroup } from "./input-group";

function LoginForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputGroup>
        <Input
          className="peer/input"
          required
          type="email"
          id="email"
          placeholder="nombre@dominio.com"
        />
        <Label htmlFor="email">Email</Label>
      </InputGroup>
      <InputGroup>
        <Input
          className="peer/input"
          required
          type="password"
          id="password"
          placeholder="........."
        />
        <Label htmlFor="password">Contraseña</Label>
      </InputGroup>
      <div className="grid mt-12">
        <Button className="hover:bg-blue-800/85 bg-blue-800 font-semibold py-6 transition-colors duration-500">
          <LogIn />
          <span>Iniciar sesión</span>
        </Button>
      </div>
    </form>
  );
}

export { LoginForm };
