import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Label } from "@radix-ui/react-label";
import { Field, Btn, Toaster, useToast } from "@shared/ui";
import { UserInputs } from "../../types";
import { login } from "../../services";

// Types
interface Props {
  onSuccess: () => void;
}

/** TODO: Create a delay prop in each request simulation or form submission for delay time */
function UserForm({ onSuccess }: Props) {
  const { toast } = useToast();
  // React query
  const mutation = useMutation({
    mutationFn: (data: UserInputs) => login(data),
    onError: () => {
      toast({
        title: "Credenciales de acceso",
        description:
          "Las credenciales de usuario son incorrectas, intenta de nuevo.",
        variant: "error",
        className: "mt-0",
        duration: 5000,
      });
    },
    onSuccess: () => {
      toast({
        title: "Credenciales de acceso",
        description:
          "Tus credenciales fueron validadas con éxito, serás redirigido al dashboard.",
        variant: "success",
        className: "mt-0",
        duration: 5000,
      });
      onSuccess();
    },
  });
  // Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();
  // Event handlers
  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-7/12  mx-auto">
      <Toaster />
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
          isLoading={mutation.isPending}
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
