import { useForm, SubmitHandler } from "react-hook-form";
import {
  Field,
  Textarea,
  Btn,
  CategorySelect,
  SupplierMultiSelect,
  RadioGroup,
  RadioGroupItem,
} from "@shared/ui";
import { ProductInputs } from "@types";
import { useProducts } from "@hooks";

export function ProductForm() {
  // hooks
  const { mutation } = useProducts();
  // Form state
  const { register, handleSubmit, setValue } = useForm<ProductInputs>();
  // Styles
  const labelBaseClass = `text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600`;
  // Event handlers
  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/** General information */}
      <div className="mb-6">
        <label
          className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
          htmlFor="name"
        >
          Nombre
        </label>
        <Field.Input
          type="text"
          id="name"
          placeholder="Escribe el nombre del producto"
          {...register("name")}
        />
      </div>
      <div className="mb-6">
        <label
          className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
          htmlFor="description"
        >
          Descripción
        </label>
        <Textarea
          id="description"
          placeholder="Escribe una breve descripción acerca del producto..."
          {...register("description")}
        />
      </div>
      {/** Management information */}
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-6">
          <label
            className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
            htmlFor="purchase"
          >
            Precio de venta
          </label>
          <Field.Input
            id="purchase"
            placeholder="Escribe el precio de venta del producto"
            {...register("price.purchase")}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
            htmlFor="sale"
          >
            Precio de compra
          </label>
          <Field.Input
            id="sale"
            placeholder="Escribe el precio de compra del producto"
            {...register("price.sale")}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-6">
          <label
            className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
            htmlFor="quantity"
          >
            Cantidad
          </label>
          <Field.Input
            type="text"
            id="quantity"
            placeholder="Escribe la cantidad del elementos del producto"
            {...register("quantity")}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
            htmlFor="images"
          >
            Imagenes
          </label>
          <Field.Input type="file" id="images" multiple />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 mb-6">
        <div>
          <label className={`${labelBaseClass}`} htmlFor="suppliers">
            Proveedor
          </label>
          <SupplierMultiSelect
            onMultiSelect={(idSuppliers) => setValue("suppliers", idSuppliers)}
          />
          {/*<SupplierSelect {...register("suppliers")} />*/}
        </div>
        <div>
          <label className={`${labelBaseClass}`}>Categorías</label>
          <CategorySelect />
        </div>
      </div>
      <div>
        <fieldset>
          <legend className={`${labelBaseClass}`}>
            Selecciona la disponibilidad del producto
          </legend>
          <RadioGroup {...register("status")}>
            <div className="flex items-center gap-x-2 mb-1">
              <RadioGroupItem value={"1"} id="status-active" />
              <label
                className="text-sm font-medium text-gray-800"
                htmlFor="status-active"
              >
                Activo
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <RadioGroupItem value={"0"} id="status-no-active" />
              <label
                className="text-sm font-medium text-gray-800"
                htmlFor="status-no-active"
              >
                No activo
              </label>
            </div>
          </RadioGroup>
        </fieldset>
      </div>
      <div className="mt-8">
        <Btn.Button type="submit">Crear producto</Btn.Button>
      </div>
    </form>
  );
}
