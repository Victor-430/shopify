export const ProductSkeleton = () => (
  <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] p-4 bg-gray-100 rounded-lg mt-4">
    <div className="space-y-4">
      {/* Image skeleton */}
      <div className="w-full h-[200px] lg:h-[300px] bg-gray-200 rounded-md animate-pulse" />

      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>

      {/* Price and heart skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse" />
    </div>
  </div>
);
