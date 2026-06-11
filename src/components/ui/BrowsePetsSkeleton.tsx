export default function BrowsePetsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="h-10 w-64 bg-gray-200 rounded mb-4" />
      <div className="h-5 w-96 bg-gray-200 rounded mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className=" rounded-xl p-6 space-y-4">
          <div className="h-10 bg-gray-200 rounded" />

          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Pet Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className=" rounded-3xl overflow-hidden shadow-sm">
              {/* Image */}
              <div className="h-64 bg-gray-200" />

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />

                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-24 bg-gray-200 rounded-full" />
                </div>

                <div className="h-4 w-40 bg-gray-200 rounded" />

                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
