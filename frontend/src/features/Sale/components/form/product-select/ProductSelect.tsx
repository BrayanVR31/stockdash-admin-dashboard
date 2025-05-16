import { Field, Skeleton } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import { SaleInputs } from "@/models/saleSchema";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const LoadedContent = lazy(() => import("./LoadedContent"));

const ProductSelect = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SaleInputs>();
  return (
    <Field.Root position="relative" invalid={!!errors?.products} required>
      <Field.Label>
        Selecciona productos
        <Field.RequiredIndicator />
      </Field.Label>
      <ErrorBoundary fallback="error">
        <Suspense fallback={<Skeleton height="40px" w="full" />}>
          <LoadedContent control={control} />
        </Suspense>
      </ErrorBoundary>
      <Field.ErrorText>
        {errors?.products && errors?.products?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export { ProductSelect };
