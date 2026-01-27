"use client";

export default function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="cursor-pointer">
        <div className="overflow-hidden bg-gray-800 w-full max-h-72 h-72" />

        <div className="mt-7 flex flex-col gap-7">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-10" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-700 rounded w-8" />

            <div className="flex gap-5">
              <div className="h-3 bg-gray-700 rounded w-16" />
              <div className="h-3 bg-gray-700 rounded w-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
