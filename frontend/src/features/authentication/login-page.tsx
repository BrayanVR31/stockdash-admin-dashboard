import { Layers } from "lucide-react";
import { LoginForm } from "./form";
import { ThemeToggle } from "./components";

function LoginPage() {
  return (
    <div className="bg-neutral-200/35 dark:bg-blue-950/75 px-6">
      <main className="min-h-svh grid items-center content-center justify-items-center gap-y-6">
        {/** Login section */}
        <div className="flex items-center justify-center gap-x-2 ">
          <div className="w-12 h-12 flex items-center justify-center text-sky-100 rounded-full bg-gradient-to-r from-sky-500 to-blue-700">
            <Layers size={24.5} />
          </div>
          <span className="font-bold text-blue-700 text-lg dark:text-blue-50">
            stockdash
          </span>
        </div>
        <div className="bg-white border border-gray-400/25 max-w-[450px] mx-auto px-8 py-10 rounded-md shadow-lg shadow-gray-400/50 dark:bg-slate-900/75 dark:shadow-none dark:border-gray-300/45">
          <header className="mb-8">
            <h1 className="font-semibold text-3xl text-center text-neutral-900/85 dark:text-white mb-2">
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
      <ThemeToggle />
    </div>
  );
}

export { LoginPage };
