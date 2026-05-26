import { Product } from "../../services/apiDummyShop";

type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="truncate text-sm text-slate-700">{value}</dd>
    </div>
  );
}

type ProductSpecsProps = {
  product: Product;
};

function ProductSpecs({ product }: ProductSpecsProps) {
  const {
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    weight,
    dimensions,
    category,
  } = product;

  return (
    <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-semibold text-slate-800">
        Product Details
      </h2>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {shippingInformation && (
          <DetailRow label="Shipping" value={shippingInformation} />
        )}
        {warrantyInformation && (
          <DetailRow label="Warranty" value={warrantyInformation} />
        )}
        {returnPolicy && <DetailRow label="Returns" value={returnPolicy} />}
        {weight > 0 && <DetailRow label="Weight" value={`${weight} g`} />}
        {dimensions && (
          <DetailRow
            label="Dimensions"
            value={`${dimensions.width} × ${dimensions.height} × ${dimensions.depth} cm`}
          />
        )}
        {category && (
          <DetailRow
            label="Category"
            value={<span className="capitalize">{category}</span>}
          />
        )}
      </dl>
    </div>
  );
}

export default ProductSpecs;
