import { useNavigate } from "react-router";
import { UserForm } from "./components";

export function SignIn() {
  // React router
  const navigate = useNavigate();
  return (
    <div>
      <main className="max-w-5xl mx-auto min-h-screen flex flex-col justify-center px-8">
        <h1 className="font-bold text-4xl text-center mb-4">
          Bienvenido(a) de nuevo
        </h1>
        <p className="text-center w-1/2 mx-auto text-slate-800 mb-8">
          Ingresa tus credenciales para gestionar todas tus operaciones,
          configuraciones y reportes.
        </p>
        {/** User form data */}
        <UserForm
          onSuccess={() => {
            navigate("/dashboard");
          }}
        />
      </main>
    </div>
  );
}
