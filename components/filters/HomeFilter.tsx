"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const filters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
];

const HomeFilter = () => {
  const searchparams = useSearchParams();
  const filterParams = searchparams.get("filter") ?? "";
  const [active, setActive] = useState(filterParams);
  const router = useRouter();

  const handleFilterClick = (value: string) => {
    if (value === active || !value) {
      const newUrl = removeKeysFromUrlQuery({
        params: searchparams.toString(),
        keysToRemove: ["filter"],
      });
      setActive("");

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchparams.toString(),
        key: "filter",
        value,
      });

      setActive(value);

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300"
          )}
          onClick={() => handleFilterClick(filter.value)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default HomeFilter;
