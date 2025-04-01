import { SquarePlus } from "lucide-react";
import Header from "@/components/Header";
import Table from "@/components/table";

const SuppliersList = () => {
  return (
    <main>
      <Header
        title="Lista de proveedores"
        description="Lista de información de todos los proveedores registrados."
        leftSide={
          <>
            <button className="btn btn-primary">
              <SquarePlus className="w-4.5" />
              <span>Crear</span>
            </button>
          </>
        }
      />
      <Table
        headerCols={["Nombre", "Email", "Teléfono", "Dirección"]}
        objectKeys={["name", "email", "phoneNumber", "address"]}
        data={[
          {
            name: "xyz",
            email: "xyx@gmail.com",
            phoneNumber: "22262237",
            address: "Street, 250 avenue",
          },
        ]}
      />
      <div className="flex justify-center mt-6">
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-primary">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
        </div>
      </div>
    </main>
  );
};

export { SuppliersList };
