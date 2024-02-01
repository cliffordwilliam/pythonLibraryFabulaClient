"use client";

import { useSearchParams } from "next/navigation";

const Dialog = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const okMessage = searchParams.get("ok");
  return (
    <>
      {errorMessage && (
        <div
          role="alert"
          className="rounded bg-red-400 px-4 py-2 text-center text-white"
        >
          {errorMessage}
        </div>
      )}
      {okMessage && (
        <div
          role="alert"
          className="rounded bg-green-400 px-4 py-2 text-center text-white"
        >
          {okMessage}
        </div>
      )}
    </>
  );
};

export default Dialog;
