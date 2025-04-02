import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Key, LogIn } from "lucide-react";
import { userSchema, UserInputs } from "./userSchema";
import { useSignIn } from "@/hooks/useAuth";
import { useAuthenticationStore } from "@/store/authenticationStore";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const { mutate, matchedError, status, isPending } = useSignIn();
  const onSubmit: SubmitHandler<UserInputs> = (user) => {
    mutate(user);
  };
  const setIsLogged = useAuthenticationStore((state) => state.setIsLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "error" && matchedError) {
      setError(matchedError.key, {
        message: matchedError.message,
      });
    } else if (status === "success") {
      setIsLogged(true);
      navigate("/dashboard");
    }
  }, [status]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend">Correo eléctronico</legend>
        <label className={`input input-${errors.email ? "error" : "primary"}`}>
          <Mail className="w-5 opacity-50" />
          <input
            type="email"
            placeholder="email@dominio.com"
            className="grow"
            {...register("email")}
          />
        </label>
        {errors.email && (
          <p className="validator-hint text-error">{errors.email.message}</p>
        )}
      </fieldset>
      <fieldset className="fieldset mb-6">
        <legend className="fieldset-legend">Contraseña</legend>
        <label
          className={`input input-${errors.password ? "error" : "primary"}`}
        >
          <Key className="w-5 opacity-50" />
          <input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            className="grow"
          />
        </label>
        {errors.password && (
          <p className="validator-hint text-error">{errors.password.message}</p>
        )}
      </fieldset>
      <button type="submit" className="btn btn-block btn-md btn-primary">
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <LogIn className="w-4.5" />
        )}
        <span>Iniciar sesión</span>
      </button>
    </form>
  );
};

export default LoginForm;
