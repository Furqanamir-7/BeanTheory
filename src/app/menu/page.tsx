"use client";

import { useMemo, useState } from "react";
import { categories, menu, milkNote, type MenuCategory } from "@/lib/menu";
import { formatPkr } from "@/lib/format";
import { AddButton } from "@/components/add-button";
import { PageIntro } from "@/components/reveal";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const items = useMemo(
    () => (active === "all" ? menu : menu.filter((item) => item.category === active)),
    [active]
  );

  return (
    <div className="pb-24">
      <PageIntro
        kicker="The list"
        title="Menu"
        text="A working house menu for this prototype. Prices are in PKR, tax inclusive at the counter. Oat, almond, or coconut on any milk drink."
      />

      <div className="sticky top-16 z-30 border-y border-bean/12 bg-tan/90 backdrop-blur-xl sm:top-[4.25rem]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
          <FilterChip active={active === "all"} onClick={() => setActive("all")}>
            All
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={active === category.id}
              onClick={() => setActive(category.id)}
            >
              {category.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <p className="mb-10 text-center text-xs tracking-wide text-bean/45">{milkNote}</p>
        {(active === "all" ? categories : categories.filter((c) => c.id === active)).map((category) => {
          const rows = items.filter((item) => item.category === category.id);
          if (!rows.length) return null;
          return (
            <section key={category.id} className="mb-16">
              <div className="mb-6 border-b border-bean/12 pb-4">
                <h2 className="font-serif text-3xl">{category.label}</h2>
                <p className="mt-2 text-sm text-bean/55">{category.blurb}</p>
              </div>
              <ul className="divide-y divide-bean/10">
                {rows.map((item) => (
                  <li key={item.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-2xl">{item.name}</h3>
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.62rem] uppercase tracking-[0.22em] text-bean/55"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-bean/60">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-4 sm:pl-6">
                      <span className="text-sm text-bean">{formatPkr(item.price)}</span>
                      <AddButton item={item} className="bg-bean text-tan hover:bg-bean/90" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] transition-colors",
        active
          ? "border-bean bg-bean text-tan"
          : "border-bean/20 text-bean/70 hover:border-bean/40"
      )}
    >
      {children}
    </button>
  );
}
