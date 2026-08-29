export type EventSlot = {
  id: string;
  time: string;
  capacity: number;
};

export type CafeEvent = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  price: number;
  image: string;
  slots: EventSlot[];
  perks: string[];
};

export const events: CafeEvent[] = [
  {
    id: "latte-art",
    title: "Latte Art Workshop",
    subtitle: "Pour, steam, and take the cup home.",
    date: "2026-09-06",
    description:
      "A two-hour session with our baristas. You will steam milk, pull shots, and practise hearts, tulips, and rosettas. Every seat includes a house espresso flight and a certificate you can ignore or frame.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
    slots: [
      { id: "la-16", time: "4:00 PM", capacity: 8 },
      { id: "la-18", time: "6:00 PM", capacity: 8 },
      { id: "la-20", time: "8:00 PM", capacity: 8 },
    ],
    perks: ["Espresso flight", "Take-home notes", "20% off merch that night"],
  },
  {
    id: "vinyl-night",
    title: "Vinyl & Cold Brew Night",
    subtitle: "Records on the counter. Lights down.",
    date: "2026-09-13",
    description:
      "An open-ended evening: guests bring a record or pick from the house crate. Cold brew on tap, late kitchen, and a table held for two hours. Book a slot so the room does not overflow.",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
    slots: [
      { id: "vn-20", time: "8:00 PM", capacity: 20 },
      { id: "vn-22", time: "10:00 PM", capacity: 20 },
    ],
    perks: ["Welcome cold brew", "Reserved two-top", "Guest DJ crate"],
  },
  {
    id: "cupping",
    title: "Sunday Cupping",
    subtitle: "Taste the beans the way we do at 7 AM.",
    date: "2026-09-14",
    description:
      "A guided cupping of three origins. You will learn to smell, slurp, and score. Quiet room, notebooks on the table, no phones if you can manage it.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    slots: [
      { id: "cu-11", time: "11:00 AM", capacity: 10 },
      { id: "cu-13", time: "1:00 PM", capacity: 10 },
    ],
    perks: ["Three origins", "Tasting notebook", "100g take-home bag"],
  },
  {
    id: "open-mic",
    title: "Open Mic at Theory",
    subtitle: "Poets, singers, people with something to say.",
    date: "2026-09-20",
    description:
      "Sign up for a five-minute slot or take a seat in the dark. House pours, a quiet kitchen, and a room that actually listens. Management confirms every performer before the list goes up.",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80",
    slots: [
      { id: "om-19", time: "7:00 PM — listener", capacity: 40 },
      { id: "om-perf", time: "7:00 PM — performer", capacity: 12 },
    ],
    perks: ["Entry drink", "Name on the night sheet"],
  },
  {
    id: "book-brunch",
    title: "Book Club Brunch",
    subtitle: "One novel. Bottomless filter. No spoilers before 11:30.",
    date: "2026-09-21",
    description:
      "This month: a short novel announced on Instagram a week out. Brunch plate included. Come having read it, or come and pretend — we will know.",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1512820534917-6cd1705e88de?auto=format&fit=crop&w=1400&q=80",
    slots: [{ id: "bb-11", time: "11:00 AM", capacity: 16 }],
    perks: ["Brunch plate", "Filter coffee", "A seat at the long table"],
  },
  {
    id: "private-cupping",
    title: "Private Tasting",
    subtitle: "Book the back room for your people.",
    date: "2026-09-27",
    description:
      "A closed tasting for birthdays, team off-sites, or anyone who wants the room without the room. Menu tailored after management confirms. Minimum six guests.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80",
    slots: [
      { id: "pt-15", time: "3:00 PM", capacity: 12 },
      { id: "pt-18", time: "6:00 PM", capacity: 12 },
    ],
    perks: ["Private room", "Custom board", "Dedicated barista"],
  },
];

export function getEvent(id: string) {
  return events.find((event) => event.id === id);
}

export function getSlot(event: CafeEvent, slotId: string) {
  return event.slots.find((slot) => slot.id === slotId);
}
