const PaginatorSkeleton = () => {
  return (
    <div className="animate-pulse flex w-full justify-between">
      <div className="flex items-center gap-x-4 flex-[0.25]">
        <div className="flex-[0.75] h-5 bg-gray-400/55 rounded-sm" />
        <div className="flex-[0.45] h-6 bg-gray-400/55 rounded-sm" />
        <div className="flex-[0.75] h-5 bg-gray-400/55 rounded-sm" />
      </div>
      <div className="flex flex-[0.35] gap-x-4 items-center">
        <div className="flex-[0.45] h-5 bg-gray-400/55 rounded-sm" />
        <div className="h-6 aspect-square bg-gray-400/55 rounded-sm" />
        <div className="h-6 aspect-square bg-gray-400/55 rounded-sm" />
        <div className="h-6 aspect-square bg-gray-400/55 rounded-sm" />
        <div className="flex-[0.45] h-5 bg-gray-400/55 rounded-sm" />
      </div>
    </div>
  );
};

export { PaginatorSkeleton };
