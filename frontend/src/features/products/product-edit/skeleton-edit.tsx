import { FormCard, CardTitle } from "@/components/ui/custom-form";

const SkeletonEdit = () => {
  return (
    <div className="grid gap-x-4 gap-y-4 grid-cols-product grid-rows-product auto-rows-product grid-flow-row">
      <FormCard
        className="row-start-1 row-span-1 col-start-2"
        header={<CardTitle>Proveedores</CardTitle>}
      >
        <div className="w-full min-h-[44px] bg-gray-400/55 rounded-md animate-pulse" />
      </FormCard>
      <FormCard
        className="col-start-1 row-start-1 row-span-1"
        header={<CardTitle>Categorías</CardTitle>}
      >
        <div className="w-full min-h-[44px] bg-gray-400/55 rounded-md animate-pulse" />
      </FormCard>
      <FormCard
        className="h-max col-start-1 row-start-2 row-span-1"
        header={<CardTitle>Precios del producto</CardTitle>}
      >
        <div className="w-1/3 h-5 mb-3 bg-gray-400/35 rounded-md animate-pulse" />
        <div className="w-full h-9 mb-8 bg-gray-400/55 rounded-md animate-pulse" />
        <div className="w-1/3 h-5 mb-3 bg-gray-400/35 rounded-md animate-pulse" />
        <div className="w-full h-9 bg-gray-400/55 rounded-md animate-pulse" />
      </FormCard>
      <FormCard
        className="row-start-2 row-span-2 col-start-2"
        header={<CardTitle>Detalles del producto</CardTitle>}
      >
        <div className="animate-pulse w-1/3 h-5 mb-3 bg-gray-400/35 rounded-md" />
        <div className="animate-pulse w-full h-7 mb-8 bg-gray-400/55 rounded-md" />
        <div className="animate-pulse w-1/3 h-5 mb-3 bg-gray-400/35 rounded-md" />
        <div className="animate-pulse w-full h-7 mb-8 bg-gray-400/55 rounded-md" />
        <div className="animate-pulse w-1/3 h-5 mb-3 bg-gray-400/35 rounded-md" />
        <div className="animate-pulse w-full h-24 bg-gray-400/55 rounded-md" />
      </FormCard>
      <FormCard
        className="col-start-1 row-start-3 row-span-1"
        header={<CardTitle>Status</CardTitle>}
      >
        <div className="w-full min-h-[44px] bg-gray-400/55 rounded-md animate-pulse" />
      </FormCard>
    </div>
  );
};

export default SkeletonEdit;
