import { useParams, useLoaderData } from "react-router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupplierList } from "@/hooks/use-supplier";
import { useCategoryList } from "@/hooks/use-category";
import { partialProduct, PartialProduct } from "../form-schema";
import { getProduct } from "@/hooks/use-product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label, FormCard, CardTitle } from "@/components/ui/custom-form";
import { SelectMenu, Option } from "@/components/ui/select-menu";

const FormEdit = () => {
  const loader = useLoaderData();
  const params = useParams();
  const { data } = getProduct({ id: params.id! });
  const {
    register,
    formState: { defaultValues },
    control,
    handleSubmit,
  } = useForm<PartialProduct>({
    resolver: zodResolver(partialProduct),
    defaultValues: {
      name: data.name,
      quantity: data.quantity,
      description: data.description,
      price: {
        purchase: data.price.purchase,
        sale: data.price.sale,
      },
      suppliers: data.suppliers,
      categories: data.categories,
      status: data.status,
    },
  });
  const { query: supplier } = useSupplierList({ withReactSelect: true });
  const { query: category } = useCategoryList({ withReactSelect: true });
  const statusOptions = [
    { value: true, label: "En venta" },
    { value: false, label: "En borrador" },
  ];
  const onSubmit: SubmitHandler<PartialProduct> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-4 gap-y-4 grid-cols-product grid-rows-product auto-rows-product grid-flow-row">
        {/*** Proveedores */}
        <FormCard header={<CardTitle>Proveedores</CardTitle>}>
          <Controller
            control={control}
            name="suppliers"
            render={({ field: { onChange }, ...field }) => (
              <SelectMenu
                {...field}
                isMulti
                options={(supplier?.data as Option<string>[]) || []}
                onChange={(value) => {
                  const selectedValue = value as Option<string>[];
                  onChange(selectedValue.map((selected) => selected.value));
                }}
                defaultValue={(supplier?.data as Option<string>[])?.filter(
                  (opt) => defaultValues?.suppliers?.includes(opt.value)
                )}
              />
            )}
          />
        </FormCard>
        {/*** Categorías */}
        <FormCard header={<CardTitle>Categorías</CardTitle>}>
          <Controller
            control={control}
            name="categories"
            render={({ field: { onChange }, ...field }) => (
              <SelectMenu
                {...field}
                isMulti
                options={(category?.data as Option<string>[]) || []}
                onChange={(value) => {
                  const selectedValue = value as Option<string>[];
                  onChange(selectedValue.map((selected) => selected.value));
                }}
                defaultValue={(category?.data as Option<string>[])?.filter(
                  (opt) => defaultValues?.categories?.includes(opt.value)
                )}
              />
            )}
          />
        </FormCard>
        {/*** Detalles de producto */}
        <FormCard
          className="col-start-2 row-span-2"
          header={<CardTitle>Detalles de producto</CardTitle>}
        >
          {/** Name */}
          <div className="mb-8 relative">
            <Label htmlFor="name" isRequired>
              Nombre
            </Label>
            <Input id="name" {...register("name")} />
          </div>
          {/** Cantidad */}
          <div className="mb-8 relative">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" {...register("quantity")} />
          </div>
          {/** Descripción */}
          <div className="mb-8 relative">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" {...register("description")} />
          </div>
        </FormCard>
        {/*** Precios del producto */}
        <FormCard
          className="col-start-1 row-start-2 h-max"
          header={<CardTitle>Precios del producto</CardTitle>}
        >
          {/** Precio de compra */}
          <div className="relative mb-8">
            <Label isRequired htmlFor="purchase">
              Compra
            </Label>
            <Input id="purchase" {...register("price.purchase")} />
          </div>
          {/** Precio de venta */}
          <div className="relative mb-8">
            <Label isRequired htmlFor="sale">
              Venta
            </Label>
            <Input id="sale" {...register("price.sale")} />
          </div>
        </FormCard>
        {/*** Status */}
        <FormCard
          className="row-start-3 h-max col-start-1"
          header={<CardTitle>Status</CardTitle>}
        >
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange }, ...field }) => (
              <SelectMenu
                {...field}
                options={statusOptions}
                onChange={(value) => {
                  const selectedValue = value as Option<string>[];
                  onChange(selectedValue.map((selected) => selected.value));
                }}
                defaultValue={statusOptions.filter(
                  (opt) => opt.value === defaultValues?.status
                )}
              />
            )}
          />
        </FormCard>
      </div>
    </form>
  );
};

export default FormEdit;
