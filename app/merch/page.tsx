"use client";

import { useAppContext } from "@/helpers/store";
import Header from "../ui/header";
import ArtisteMerch from "../artiste/_ui/artiste-merch";
import FilterBox from "./_ui/filter-box";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Shop() {
  const context = useAppContext();
  const { cart, all_merch } = context;

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // Extract unique categories
  const categories: string[] = all_merch
    ? Array.from(
        new Set(
          all_merch
            .map((p: any) => p?.category?.toLowerCase()) // Extract categories
            .filter((category: string): category is string => !!category) // Filter out undefined
        )
      )
    : [];

  // State for selected filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "low-to-high" | "high-to-low" | null
  >(null);

  // Filter and sort function
  const filteredMerch = useMemo(() => {
    let filtered = all_merch || [];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (merch: any) =>
          merch?.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (merch: any) =>
          merch?.name?.toLowerCase().includes(searchLower) || // Match merch name
          merch?.category?.toLowerCase().includes(searchLower) // Match category
      );
    }

    // Sort by price
    if (sortOrder === "low-to-high") {
      filtered = filtered.sort((a: any, b: any) => a?.price - b?.price);
    } else if (sortOrder === "high-to-low") {
      filtered = filtered.sort((a: any, b: any) => b?.price - a?.price);
    }

    return filtered;
  }, [all_merch, selectedCategory, sortOrder, search]);

  return (
    <main className="flex min-h-screen flex-col lg:items-start items-center w-full lg:px-24 md:px-12 px-6">
      <Header itemsCount={cart?.items?.length} />
      <div className="flex flex-col items-start w-full mt-12">
        <FilterBox
          clearFilter={() => {
            setSelectedCategory(null);
            setSortOrder(null);
          }}
          categories={categories ?? [""]}
          onCategorySelect={(category) => setSelectedCategory(category)}
          onSortOrderSelect={(order) => setSortOrder(order)}
        />
        <ArtisteMerch merch={filteredMerch} />
      </div>
    </main>
  );
}
