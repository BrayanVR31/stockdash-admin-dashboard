import { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label, Error } from "@/components/ui/custom-form";
import { SupplierCreate } from "@/features/suppliers/supplier-add/supplierSchema";
import {
  DragAndDrop,
  FilesProvider,
  useFiles,
} from "@/components/ui/drag-and-drop";

const FieldImage = () => {
  const { attachedFiles } = useFiles();
  const {
    control,
    formState: { errors },
  } = useFormContext<SupplierCreate>();

  console.log(attachedFiles);

  return (
    <FilesProvider isMulti={false}>
      <DragAndDrop />
      <Controller
        control={control}
        name="image"
        render={({ field: { value, onChange, ...field } }) => (
          <Input
            className="hidden"
            {...field}
            type="text"
            id="image"
            onChange={() => onChange(attachedFiles![0])}
          />
        )}
      />

      <Error message={errors?.image?.message} />
    </FilesProvider>
  );
};

export { FieldImage };
