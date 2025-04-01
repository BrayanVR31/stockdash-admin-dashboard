const SupplierAddress = () => {
  return (
    <div className="card bg-navbar row-span-2 shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Dirección del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Calle</label>
          <input
            className="input w-full"
            placeholder="Escribe la calle del proveedor"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Estado</label>
          <input
            className="input w-full"
            placeholder="Escribe el estado del proveedor"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Código postal</label>
          <input
            className="input w-full"
            placeholder="Escribe el código postal del proveedor"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Colonia</label>
          <input
            className="input w-full"
            placeholder="Escribe la colonia del proveedor"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierAddress;
