"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { uid } from "@/lib/format";
import type { MenuItem } from "@/lib/menu";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  fulfillment: "pickup" | "dine-in";
  table?: string;
  notes?: string;
  items: CartItem[];
  total: number;
  status: "received" | "preparing" | "ready" | "completed";
};

export type BookingRecord = {
  id: string;
  createdAt: string;
  eventId: string;
  eventTitle: string;
  date: string;
  slotId: string;
  slot: string;
  name: string;
  phone: string;
  guests: number;
  notes?: string;
  status: "pending" | "confirmed" | "waitlisted" | "declined";
};

export type ReservationRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: "pending" | "confirmed" | "declined";
};

type CafeStore = {
  cart: CartItem[];
  orders: OrderRecord[];
  bookings: BookingRecord[];
  reservations: ReservationRecord[];
  hydrated: boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, note?: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: (input: Omit<OrderRecord, "id" | "createdAt" | "items" | "total" | "status">) => OrderRecord;
  addBooking: (input: Omit<BookingRecord, "id" | "createdAt" | "status">) => BookingRecord;
  addReservation: (input: Omit<ReservationRecord, "id" | "createdAt" | "status">) => ReservationRecord;
  setOrderStatus: (id: string, status: OrderRecord["status"]) => void;
  setBookingStatus: (id: string, status: BookingRecord["status"]) => void;
  setReservationStatus: (id: string, status: ReservationRecord["status"]) => void;
};

const KEYS = {
  cart: "bt-cart",
  orders: "bt-orders",
  bookings: "bt-bookings",
  reservations: "bt-reservations",
} as const;

const CafeContext = createContext<CafeStore | null>(null);

function getItem(key: string) {
  return localStorage.getItem(key);
}

function subscribe(key: string, onChange: () => void) {
  const handler = (event: Event) => {
    if (event instanceof StorageEvent && event.key && event.key !== key) return;
    onChange();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(`bt:${key}`, onChange);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(`bt:${key}`, onChange);
  };
}

function usePersisted<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    () => getItem(key),
    () => null
  );
  const data = useMemo(() => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);

  const setData = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const prev = (() => {
        try {
          const stored = localStorage.getItem(key);
          return stored ? (JSON.parse(stored) as T) : fallback;
        } catch {
          return fallback;
        }
      })();
      const next = typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(`bt:${key}`));
    },
    [key, fallback]
  );

  return [data, setData] as const;
}

const emptyCart: CartItem[] = [];
const emptyOrders: OrderRecord[] = [];
const emptyBookings: BookingRecord[] = [];
const emptyReservations: ReservationRecord[] = [];

export function CafeProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartItem[]>(KEYS.cart, emptyCart);
  const [orders, setOrders] = usePersisted<OrderRecord[]>(KEYS.orders, emptyOrders);
  const [bookings, setBookings] = usePersisted<BookingRecord[]>(KEYS.bookings, emptyBookings);
  const [reservations, setReservations] = usePersisted<ReservationRecord[]>(
    KEYS.reservations,
    emptyReservations
  );
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((item: MenuItem, note?: string) => {
    setCart((prev) => {
      const existing = prev.find((row) => row.id === item.id && row.note === note);
      if (existing) {
        return prev.map((row) =>
          row === existing ? { ...row, qty: row.qty + 1 } : row
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, note }];
    });
  }, [setCart]);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((row) => row.id !== id) : prev.map((row) => (row.id === id ? { ...row, qty } : row))
    );
  }, [setCart]);

  const clearCart = useCallback(() => setCart(emptyCart), [setCart]);

  const placeOrder = useCallback(
    (input: Omit<OrderRecord, "id" | "createdAt" | "items" | "total" | "status">) => {
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const record: OrderRecord = {
        ...input,
        id: uid("ord"),
        createdAt: new Date().toISOString(),
        items: cart,
        total,
        status: "received",
      };
      setOrders((prev) => [record, ...prev]);
      setCart(emptyCart);
      return record;
    },
    [cart, setCart, setOrders]
  );

  const addBooking = useCallback((input: Omit<BookingRecord, "id" | "createdAt" | "status">) => {
    const record: BookingRecord = {
      ...input,
      id: uid("tix"),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  }, [setBookings]);

  const addReservation = useCallback((input: Omit<ReservationRecord, "id" | "createdAt" | "status">) => {
    const record: ReservationRecord = {
      ...input,
      id: uid("res"),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setReservations((prev) => [record, ...prev]);
    return record;
  }, [setReservations]);

  const setOrderStatus = useCallback((id: string, status: OrderRecord["status"]) => {
    setOrders((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }, [setOrders]);

  const setBookingStatus = useCallback((id: string, status: BookingRecord["status"]) => {
    setBookings((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }, [setBookings]);

  const setReservationStatus = useCallback((id: string, status: ReservationRecord["status"]) => {
    setReservations((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }, [setReservations]);

  const value = useMemo(
    () => ({
      cart,
      orders,
      bookings,
      reservations,
      hydrated: true,
      cartOpen,
      setCartOpen,
      addToCart,
      setQty,
      clearCart,
      placeOrder,
      addBooking,
      addReservation,
      setOrderStatus,
      setBookingStatus,
      setReservationStatus,
    }),
    [
      cart,
      orders,
      bookings,
      reservations,
      cartOpen,
      addToCart,
      setQty,
      clearCart,
      placeOrder,
      addBooking,
      addReservation,
      setOrderStatus,
      setBookingStatus,
      setReservationStatus,
    ]
  );

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafe() {
  const ctx = useContext(CafeContext);
  if (!ctx) throw new Error("useCafe must be used within CafeProvider");
  return ctx;
}

export function cartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
