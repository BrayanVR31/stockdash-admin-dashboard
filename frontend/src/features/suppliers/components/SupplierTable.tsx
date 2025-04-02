import { useState } from "react";
import { useSupplierList } from "@/hooks/useSupplier";
import Table from "@/components/table";

const SupplierTable = () => {
  const [pagination, setPagination] = useState({
    perPage: 5,
    page: 1,
  });
  const { data } = useSupplierList({
    pagination,
  });
  const items = Array(Math.ceil(data.total / pagination.perPage)).fill(0);
  return (
    <>
      <Table
        headerCols={["Nombre", "Email", "Teléfono"]}
        data={data.results}
        objectKeys={["name", "contact.email", "contact.phoneNumber"]}
      />
      <div className="flex justify-center mt-6">
        <div className="join">
          {items.map((_, n) => (
            <button
              onClick={() => setPagination({ ...pagination, page: n + 1 })}
              className={`join-item btn ${pagination.page === n + 1 && "btn-primary"}`}
              key={n + 1}
            >
              {n + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

/*
<button className="join-item btn">1</button>
<button className="join-item btn btn-primary">2</button>
<button className="join-item btn btn-disabled">...</button>
<button className="join-item btn">99</button>
<button className="join-item btn">100</button>
*/

export default SupplierTable;
