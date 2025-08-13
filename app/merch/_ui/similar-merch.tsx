"use client";

import { useAppContext } from "@/helpers/store";
import React from "react";
import Merch from "@/app/ui/merch";

export default function SimilarMerch({ items, viewMerch }: any) {
  const context = useAppContext();
  const { setSelectedMerch } = context;

  return (
    <>
      {items?.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center py-6 mt-16">
          <p className="tracking-wide font-semibold lg:text-3xl text-xl mb-10">
            MORE LIKE THIS
          </p>
          <div className="lg:w-full grid lg:grid-cols-4 grid-cols-2 lg:gap-28 gap-5">
            {items?.map((m: any) => (
              <Merch
                key={m.id}
                merch={m}
                viewMerch={() => {
                  setSelectedMerch(m);
                  viewMerch(m.id);
                }} // Pass viewProduct function
                addToBag={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
