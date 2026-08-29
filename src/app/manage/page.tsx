"use client";

import { FormEvent, useState } from "react";
import { cafe } from "@/lib/cafe";
import { formatDate, formatPkr } from "@/lib/format";
import {
  useCafe,
  type BookingRecord,
  type OrderRecord,
  type ReservationRecord,
} from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManagePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const store = useCafe();

  function onPin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pin = String(new FormData(event.currentTarget).get("pin") ?? "");
    if (pin === cafe.managePin) {
      setUnlocked(true);
      setError("");
    } else {
      setError("That pin is not it.");
    }
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-[80svh] items-center justify-center px-5 pt-24">
        <form onSubmit={onPin} className="w-full max-w-sm space-y-4 border border-bean/12 bg-cream p-8">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-bean/60">Floor</p>
          <h1 className="font-serif text-4xl">Management</h1>
          <p className="text-sm text-bean/60">
            Confirm tickets, tables, and web orders. Pin is the last four digits of the cafe line.
          </p>
          <div className="space-y-2">
            <Label htmlFor="pin">Pin</Label>
            <Input id="pin" name="pin" type="password" className="h-10 border-bean/15 bg-transparent" />
          </div>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <Button type="submit" className="h-11 w-full bg-bean text-tan hover:bg-bean/90">
            Enter
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-5 py-28 sm:px-8">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-bean/60">Floor</p>
        <h1 className="mt-2 font-serif text-5xl">Incoming</h1>
        <p className="mt-3 max-w-xl text-sm text-bean/60">
          Prototype board. Data lives in this browser. Confirm a ticket and the guest status updates
          immediately.
        </p>
      </div>

      <Board
        title="Event tickets"
        empty="No ticket requests yet."
        count={store.bookings.length}
      >
        {store.bookings.map((row) => (
          <TicketRow key={row.id} row={row} onStatus={store.setBookingStatus} />
        ))}
      </Board>

      <Board title="Web orders" empty="No web orders yet." count={store.orders.length}>
        {store.orders.map((row) => (
          <OrderRow key={row.id} row={row} onStatus={store.setOrderStatus} />
        ))}
      </Board>

      <Board title="Tables" empty="No table holds yet." count={store.reservations.length}>
        {store.reservations.map((row) => (
          <TableRow key={row.id} row={row} onStatus={store.setReservationStatus} />
        ))}
      </Board>
    </div>
  );
}

function Board({
  title,
  empty,
  count,
  children,
}: {
  title: string;
  empty: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 font-serif text-3xl">{title}</h2>
      <div className="divide-y divide-bean/10 border border-bean/12 bg-cream">
        {count > 0 ? children : <p className="p-6 text-sm text-bean/45">{empty}</p>}
      </div>
    </section>
  );
}

function TicketRow({
  row,
  onStatus,
}: {
  row: BookingRecord;
  onStatus: (id: string, status: BookingRecord["status"]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">
          {row.eventTitle} · {row.slot}
        </p>
        <p className="text-sm text-bean/55">
          {row.name} · {row.phone} · {row.guests} guest{row.guests > 1 ? "s" : ""} · {formatDate(row.date)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bean/70">{row.status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["confirmed", "waitlisted", "declined"] as const).map((status) => (
          <StatusButton key={status} active={row.status === status} onClick={() => onStatus(row.id, status)}>
            {status}
          </StatusButton>
        ))}
      </div>
    </div>
  );
}

function OrderRow({
  row,
  onStatus,
}: {
  row: OrderRecord;
  onStatus: (id: string, status: OrderRecord["status"]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">
          {row.name} · {formatPkr(row.total)}
        </p>
        <p className="text-sm text-bean/55">
          {row.fulfillment} · {row.phone} · {row.items.map((item) => `${item.qty}× ${item.name}`).join(", ")}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bean/70">{row.status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["preparing", "ready", "completed"] as const).map((status) => (
          <StatusButton key={status} active={row.status === status} onClick={() => onStatus(row.id, status)}>
            {status}
          </StatusButton>
        ))}
      </div>
    </div>
  );
}

function TableRow({
  row,
  onStatus,
}: {
  row: ReservationRecord;
  onStatus: (id: string, status: ReservationRecord["status"]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">
          {row.name} · {row.guests} · {row.time}
        </p>
        <p className="text-sm text-bean/55">
          {row.phone} · {row.date}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bean/70">{row.status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["confirmed", "declined"] as const).map((status) => (
          <StatusButton key={status} active={row.status === status} onClick={() => onStatus(row.id, status)}>
            {status}
          </StatusButton>
        ))}
      </div>
    </div>
  );
}

function StatusButton({
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
      className={
        active
          ? "rounded-full border border-bean bg-bean px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-tan"
          : "rounded-full border border-bean/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-bean/70"
      }
    >
      {children}
    </button>
  );
}
