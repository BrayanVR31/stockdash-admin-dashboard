import { LoginForm } from "./login-form";

function LoginPage() {
  return (
    <div className="bg-blue-300/60 px-6">
      <main className="min-h-svh grid items-center">
        {/** Login section */}
        <div className="bg-white max-w-[450px] mx-auto px-8 py-10 rounded-md shadow-md shadow-gray-800/35">
          <header className="mb-8">
            <h1 className="font-semibold text-2xl text-center">
              Inicia sesión
            </h1>
            <p className="text-center text-sm text-wrap">
              Ingresa tu cuenta para gestionar las operaciones administrativas
              del dashboard
            </p>
          </header>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
