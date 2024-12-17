import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineAdd } from "react-icons/md";
import { Btn, Badge, Paginator } from "@shared/ui";
import { getSuppliers } from "../services";
import { SupplierList } from "./components";

function SupplierPage() {
  const { page, perPage } = Paginator.usePaginationCtx();
  // Router
  const navigate = useNavigate();
  // Queries
  const { data, isError, isLoading } = useQuery({
    queryKey: ["suppliers", page, perPage],
    queryFn: () => getSuppliers({ page, perPage }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Data is loading...</div>;
  if (isError) return <div>Error to load data!</div>;
  return (
    <div className="bg-white rounded-md shadow-xl w-full p-8">
      <header className="flex justify-between p-4 items-center">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-2xl">Proveedores</h4>
          <Badge variant="neutral">{data?.total} proveedores</Badge>
        </div>
        <div className="flex items-center gap-x-4">
          <Btn.Button variant="secondary">Descarga pdf</Btn.Button>
          <Btn.Button onClick={() => navigate("./create")}>
            <MdOutlineAdd className="text-lg mr-2" />
            <span>Agregar proveedor</span>
          </Btn.Button>
        </div>
      </header>
      <div>
        <SupplierList data={data?.results || []} />
        <Paginator.Pagination name="proveedores" total={data?.total || 0} />
      </div>
    </div>
  );
}

export function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  return (
    <Paginator.PaginationProvider
      value={{ page, setPage, perPage, setPerPage }}
    >
      <SupplierPage />
    </Paginator.PaginationProvider>
  );
}
