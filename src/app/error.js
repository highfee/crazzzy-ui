"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[90vh] grid place-items-center text-center">
      <div>
        <p className="text-5xl mb-10 text-red-600">Oops !!!</p>

        <p className="text-2xl mb-10">
          Slow or no internet connection <br /> Please check your internet
          settings.
        </p>

        <button
          className=" border rounded-md px-10 py-2 border-gray-500"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
