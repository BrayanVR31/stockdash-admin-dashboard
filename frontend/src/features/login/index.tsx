import { Navigate } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useAuthenticationStore } from "@/store/authenticationStore";
import LoginForm from "./components/LoginForm";
import Logo from "@/components/Logo";

const LoginPage = () => {
  const isLogged = useAuthenticationStore((state) => state.isLogged);
  if (isLogged) return <Navigate to="/dashboard" />;
  return (
    <div className="login-page">
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-y-6">
        {/** Login section */}
        <div className="flex items-center justify-center gap-x-2">
          <Logo showTitle />
        </div>
        <div className="login-form">
          <header className="mb-8">
            <h1 className="font-semibold text-3xl text-center mb-2 antialias">
              Inicia sesión
            </h1>
            <p className="text-center text-sm text-wrap">
              Ingresa tu credenciales para acceder al dashboard
            </p>
          </header>
          <LoginForm />
        </div>
      </main>
      {/** Dark theme toggle */}
      <label className="swap swap-rotate fixed bottom-5 right-5 btn btn-xl btn-circle btn-secondary">
        <input type="checkbox" className="theme-controller" value="light" />
        <Sun className="swap-off w-8 h-8 fill-current" />
        <Moon className="swap-on w-8 h-8 fill-current" />
      </label>
    </div>
  );
};

export { LoginPage };
