import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode } from "react";
import { Label } from "@radix-ui/react-label";
import { Field, Btn } from "@shared/ui";
import { UserInputs } from "./types";

function UserForm() {
  // Hook form
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<UserInputs>();
  // Event handlers
  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-7/12  mx-auto">
      {/** Email */}
      <InputGroup>
        <Label className="font-semibold" htmlFor="email">
          Email*
        </Label>
        <Field.Input
          type="email"
          id="email"
          hasError={Boolean(errors.email)}
          {...register("email", { required: true })}
          placeholder="Ingresa tu correo electrónico"
        />
        {errors.email && (
          <ErrorMessage>El email es un campo requerido.</ErrorMessage>
        )}
      </InputGroup>
      {/** Password */}
      <InputGroup>
        <Label className={`font-semibold `} htmlFor="password">
          Password*
        </Label>
        <Field.Input
          type="password"
          id="password"
          hasError={Boolean(errors.password)}
          {...register("password", { required: true })}
          placeholder="Ingresa tu contraseña"
        />
        {errors.password && (
          <ErrorMessage>La contraseña es un campo requerido.</ErrorMessage>
        )}
      </InputGroup>
      <div className="grid mt-12">
        <Btn.Button
          isLoading={isLoading}
          loadingText="Verificando credenciales"
          type="submit"
        >
          <span>Inicia sesión</span>
        </Btn.Button>
      </div>
    </form>
  );
}

function ErrorMessage({ children }: { children: string }) {
  return (
    <span className="text-red-700 text-sm absolute bottom-0 translate-y-7 font-semibold">
      {children}
    </span>
  );
}

function InputGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-y-2 mb-10 relative">{children}</div>;
}

export { UserForm };
