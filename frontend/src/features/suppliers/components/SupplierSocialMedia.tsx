const SupplierSocialMedia = () => {
  return (
    <div className="card bg-navbar shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Redes sociales del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Facebook</label>
          <input
            className="input w-full"
            placeholder="Escribe el url de facebook"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierSocialMedia;
