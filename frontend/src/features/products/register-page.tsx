import {
  FormProvider,
  useForm,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getProductById } from "@/services";
import { useProduct } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  partialProduct,
  ProductForm,
  PartialProduct,
} from "./product-form";
import { Header } from "@/components/ui/dashboard-crud";
import { Button } from "@/components/ui/dashboard-crud";
import { FormCreate } from "./product-form";

interface Props {
  registerMode?: "edit" | "create";
}

function RegisterPage({ registerMode = "create" }: Props) {
  const queryClient = new QueryClient();
  const { add, getItem } = useProduct();
  // Handling form state and event actions
  type MatchRegister = typeof registerMode extends "create"
    ? ProductForm
    : PartialProduct;
  const methods = useForm<MatchRegister>({
    resolver: zodResolver(productSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    add.mutate(data);
  };
  useEffect(() => {
    methods.reset();
  }, [methods.reset, queryClient.isFetching]);

  if (registerMode === "edit") return <EditPage methods={methods} />;
  return (
    <div className="h-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header title="Crear producto">
            <Button type="submit">
              {registerMode === "edit" ? "Actualizar" : "Agregar"} producto
            </Button>
          </Header>
          {/** Form grid layout */}
          <FormCreate />
        </form>
      </FormProvider>
    </div>
  );
}

interface EditPageProps {
  methods: UseFormReturn;
}

function EditPage({ methods }: EditPageProps) {
  const { getItem: product } = useProduct();
  const onSubmit: SubmitHandler<PartialProduct> = (product) => {};
  useEffect(() => {
    methods.reset(product.data);
  }, [methods.reset]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header title="Actualiza producto">
          <Button type="submit">Actualizar producto</Button>
        </Header>
        <FormCreate />
      </form>
    </FormProvider>
  );
}

export { RegisterPage };
