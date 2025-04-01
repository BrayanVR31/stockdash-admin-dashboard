import { Navigate } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { LoginForm } from "./components/LoginForm";
import Logo from "@/components/Logo";

function LoginPage() {
  const isLogged = useAuthenticationStore((state) => state.isLogged);
  if (isLogged) return <Navigate to="/dashboard" />;
  return (
    <div className="relative bg-gradient-to-b from-blue-50 from-25% to-blue-500/85 dark:from-slate-900/90 dark:from-5% dark:via-slate-950 dark:via-50% dark:to-slate-900/75 px-6 w-full after:content-[''] after:absolute after:w-44 after:h-44 dark:after:bg-sky-800/25 after:bg-blend-lighten after:top-0 after:right-0 after:rounded-full after:blur-2xl before:content-[''] before:absolute before:bottom-1/3 before:w-52 before:h-52 dark:before:bg-sky-800/25 before:bg-blend-lighten before:rounded-full before:blur-2xl before:left-0 before:-translate-x-1/2">
      <main className="min-h-screen w-full flex flex-col items-cente justify-center gap-y-6">
        {/** Login section */}
        <div className="flex items-center justify-center gap-x-2 ">
          <Logo showTitle />
        </div>
        <div className="bg-white border border-gray-400/25 mx-auto px-8 py-10 rounded-md shadow-lg shadow-gray-400/50 dark:bg-slate-900/40 dark:shadow-none dark:border-gray-300/45 w-full max-w-sm z-10 dark:backdrop-blur-md">
          <header className="mb-8">
            <h1 className="font-semibold text-3xl text-center text-neutral-900/85 dark:text-white mb-2 antialias">
              Inicia sesión
            </h1>
            <p className="text-center text-sm text-wrap text-neutral-700/95 dark:text-neutral-300">
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
}

export { LoginPage };
