import { Field, SupplierSelect, ProductSelect } from "@shared/ui";

export function PurchaseForm() {
  // Styles
  const labelBaseClass = `text-sm font-semibold block mb-2 after:content-['*'] after:ml-1 after:text-red-600`;
  return (
    <form>
      {/** Name field */}
      <div className="mb-6">
        <label className={`${labelBaseClass}`} htmlFor="name">
          Nombre
        </label>
        <Field.Input
          type="text"
          id="name"
          placeholder="Escribe el nombre del producto"
        />
      </div>
      {/** Ticket images & purchase date */}
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-6">
          <label className={`${labelBaseClass}`} htmlFor="ticketImages">
            Tickets
          </label>
          <Field.Input type="file" multiple id="ticketImages" />
        </div>
        <div>
          <label className={`${labelBaseClass}`} htmlFor="purchaseDate">
            Fecha de compra
          </label>
          <Field.Input type="date" id="purchaseDate" />
        </div>
      </div>
      {/** Total price & quantity */}
      <div className="grid grid-cols-2 gap-x-4 mb-6">
        <div>
          <label className={`${labelBaseClass}`} htmlFor="totalPrice">
            Precio total
          </label>
          <Field.Input
            type="number"
            id="totalPrice"
            placeholder="Escribe el precio total de la compra"
          />
        </div>
        <div>
          <label className={`${labelBaseClass}`} htmlFor="totalQuantity">
            Cantidad total
          </label>
          <Field.Input
            type="number"
            id="totalQuantity"
            placeholder="Escribe la cantidad total de elementos de la compra"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <label className={`${labelBaseClass}`} htmlFor="suppliers">
            Proveedores
          </label>
          <SupplierSelect />
        </div>
        <div>
          <label className={`${labelBaseClass}`} htmlFor="suppliers">
            Productos
          </label>
          <ProductSelect />
        </div>
      </div>
    </form>
  );
}
