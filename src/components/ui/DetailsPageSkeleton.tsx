export default function PetDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      {/* Back Button */}
      <div className="h-5 w-24 bg-gray-200 rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          {/* Main Image */}
          <div className="aspect-square w-full bg-gray-200 rounded-lg" />

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 w-16 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-5">
          {/* Title */}
          <div className="h-8 w-72 bg-gray-200 rounded" />

          {/* Prices */}
          <div className="flex gap-3">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>

          <div className="h-4 w-40 bg-gray-200 rounded" />

          {/* Quantity */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-48 bg-gray-200 rounded" />
          </div>

          {/* Buy Button */}
          <div className="h-14 w-full bg-gray-200 rounded" />

          {/* Specifications */}
          <div className="space-y-4 pt-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded" />

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="flex justify-between border-b pb-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
