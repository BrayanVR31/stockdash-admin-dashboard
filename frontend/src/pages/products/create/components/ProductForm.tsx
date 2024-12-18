import {
  Field,
  Textarea,
  Btn,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@shared/ui";
import { useSuppliers, useCategories } from "@hooks";

export function ProductForm() {
  return (
    <form>
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
          />
        </div>
        <div className="mb-6">
          <label
            className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
            htmlFor="images"
          >
            Imagenes
          </label>
          <Field.Input type="file" id="images" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <SupplierSelect />
        <CategorySelect />
      </div>
      <div className="mt-8">
        <Btn.Button type="submit">Crear producto</Btn.Button>
      </div>
    </form>
  );
}

function CategorySelect() {
  const { data } = useCategories();
  return (
    <div className="mb-6">
      <label
        htmlFor="categories"
        className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
      >
        Categorías
      </label>
      <Select>
        <SelectTrigger id="categories">
          <SelectValue placeholder="Selecciona una categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>Lista de categorías</SelectGroupLabel>
            {data?.results.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >{`${item.name}`}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function SupplierSelect() {
  const { data } = useSuppliers();
  return (
    <div className="mb-6">
      <label
        htmlFor="suppliers"
        className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600"
      >
        Proveedor
      </label>
      <Select>
        <SelectTrigger id="suppliers">
          <SelectValue placeholder="Selecciona un proveedor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>Lista de proveedores</SelectGroupLabel>
            {data?.results.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >{`${item.name}`}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
