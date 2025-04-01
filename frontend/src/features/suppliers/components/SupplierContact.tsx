const SupplierContact = () => {
  return (
    <div className="card bg-navbar shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Contacto del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Email</label>
          <input
            className="input w-full"
            placeholder="Escribe el email del proveedor"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Teléfono</label>
          <input
            className="input w-full"
            placeholder="Escribe el número telefónico del proveedor"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierContact;
