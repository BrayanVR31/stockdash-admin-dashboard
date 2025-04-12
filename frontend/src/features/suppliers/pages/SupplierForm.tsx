import { useParams, useLoaderData } from "react-router";
import { useGetSupplier } from "@/hooks/useSupplier";
import { Supplier } from "@/types/supplier";
import { Form } from ".";

interface EditProps {
  id: string;
}

const Edit = ({ id }: EditProps) => {
  const { data, isPending, isError } = useGetSupplier(id);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <Form supplier={data} />;
};

const SupplierForm = () => {
  const params = useParams();
  if (params.id) return <Edit id={params.id} />;
  return <Form />;
};

export { SupplierForm };
