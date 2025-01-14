import { LogIn } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInputs, userSchema } from "./user-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label, InputGroup, ValidationError } from "../components";
import { useAuth } from "./use-auth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "", password: "" },
  });
  const { authMutation } = useAuth();
  // Event handlers
  const onSubmit: SubmitHandler<UserInputs> = (user) => {
    console.log(user);
    authMutation.mutate(user);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputGroup>
        <Input
          className={`peer/input focus-visible:ring-blue-500 dark:border-neutral-50 dark:placeholder:text-neutral-200 ${getInputErrorClass(Boolean(errors?.email))}`}
          required
          type="email"
          id="email"
          placeholder="nombre@dominio.com"
          {...register("email")}
        />
        <Label htmlFor="email">Email</Label>
        {errors.email && (
          <ValidationError>{errors.email.message}</ValidationError>
        )}
      </InputGroup>
      <InputGroup>
        <Input
          className={`peer/input focus-visible:ring-blue-500 dark:border-neutral-50 dark:placeholder:text-neutral-200 ${getInputErrorClass(Boolean(errors?.password))}`}
          required
          type="password"
          id="password"
          min={8}
          placeholder="........."
          {...register("password")}
        />
        <Label htmlFor="password">Contraseña</Label>
        {errors.password && (
          <ValidationError>{errors.password.message}</ValidationError>
        )}
      </InputGroup>
      <div className="grid mt-12">
        <Button className="hover:bg-blue-800/85 bg-blue-800 font-semibold py-6 transition-all duration-500 dark:text-white hover:translate-y-1">
          <LogIn />
          <span>Iniciar sesión</span>
        </Button>
      </div>
    </form>
  );
}

function getInputErrorClass(state: boolean) {
  return state
    ? "border-red-500 focus-visible:ring-red-600 dark:border-red-500 dark:focus-visible:ring-red-600"
    : "";
}

export { LoginForm };
