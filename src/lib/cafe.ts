export const cafe = {
  name: "BEAN THEORY",
  shortName: "Bean Theory",
  tagline: "Beyond Just Coffee!!",
  description:
    "Specialty coffee, late plates, and a room that stays open with the city. Bean Theory is a neighbourhood cafe in CCA 1, DHA Phase 6 — built for morning espresso, long conversations, and nights that refuse to end.",
  addressLine: "109, CCA 1, Sector C",
  area: "DHA Phase 6, Lahore",
  fullAddress: "109, CCA 1, Sector C, DHA Phase 6, Lahore, Pakistan",
  phoneDisplay: "+92 323 4664878",
  phoneTel: "+923234664878",
  whatsapp: "923234664878",
  instagram: "https://www.instagram.com/beantheorylhr/",
  instagramHandle: "@beantheorylhr",
  mapsUrl: "https://maps.google.com/?q=BEAN+THEORY+DHA+Phase+6+Lahore",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0319233273385!2d74.4519112!3d31.46830799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391909007baa25ef%3A0x39c7c271db8274b8!2sBEAN%20THEORY!5e0!3m2!1sen!2s!4v1788028484680!5m2!1sen!2s",
  hours: [
    { label: "Monday – Sunday", value: "9:00 AM – 3:00 AM" },
    { label: "Kitchen", value: "9:00 AM – 2:00 AM" },
    { label: "Brunch", value: "9:00 AM – 4:00 PM" },
  ],
  hoursShort: "Open daily 9:00 AM – 3:00 AM",
  managePin: "4878",
} as const;

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    alt: "Barista pouring espresso into a ceramic cup",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    alt: "Warm cafe interior with wood and low light",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    alt: "Coffee beans in a wooden scoop",
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    alt: "Latte art in a white cup",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    alt: "Cafe counter with pastries",
  },
  {
    src: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=1200&q=80",
    alt: "Friends talking over coffee at night",
  },
] as const;
