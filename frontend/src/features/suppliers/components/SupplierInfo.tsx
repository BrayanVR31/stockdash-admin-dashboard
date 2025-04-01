const SupplierInfo = () => {
  return (
    <div className="card bg-navbar shadow-lg h-min">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Información general
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Nombre</label>
          <input
            className="input w-full"
            placeholder="Escribe el nombre del proveedor"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Imagen del proveedor</label>
          <input type="file" className="file-input file-input-primary w-full" />
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
