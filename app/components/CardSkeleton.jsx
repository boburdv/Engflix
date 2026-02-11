"use client";

export default function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="cursor-pointer">
        <div className="overflow-hidden bg-gray-800 w-full h-56 sm:h-64 md:h-72 rounded-md" />

        <div className="mt-4 sm:mt-6 md:mt-7 flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="flex justify-between items-start gap-2">
            <div className="h-4 sm:h-5 bg-gray-700 w-3/4 rounded" />
            <div className="h-4 sm:h-5 bg-gray-700 w-10 shrink-0 rounded" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-700 w-5 sm:w-7 rounded" />

            <div className="flex gap-3 sm:gap-5">
              <div className="h-3 sm:h-4 bg-gray-700 w-16 rounded" />
              <div className="h-3 sm:h-4 bg-gray-700 w-10 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
