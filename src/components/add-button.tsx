"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/lib/menu";
import { useCafe } from "@/lib/store";
import { formatPkr } from "@/lib/format";

export function AddButton({ item, className }: { item: MenuItem; className?: string }) {
  const { addToCart } = useCafe();

  return (
    <Button
      className={className}
      size="sm"
      onClick={() => {
        addToCart(item);
        toast.success(`${item.name} added`, { description: formatPkr(item.price) });
      }}
    >
      <Plus data-icon="inline-start" />
      Add
    </Button>
  );
}
