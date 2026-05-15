function ProductItemSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-slate-200" />

      <div className="flex flex-1 flex-col gap-1 px-4 pb-2 pt-3">
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-auto flex items-center gap-2 pt-1">
          <div className="h-5 w-14 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-10 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="px-4 pb-4 pt-1">
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default ProductItemSkeleton;
