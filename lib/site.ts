export const siteConfig = {
  name: "ProWarm India",
  url: "https://prowarm.in",
  tagline: "Underfloor heating, engineered for Indian homes.",
  description:
    "ProWarm India designs and installs electric and water-based underfloor heating systems, smart thermostats and insulation — invisible warmth for tile, stone, laminate and wood floors across India.",
  email: "hello@prowarm.in",
  phone: "+91 98110 40040",
  address: "Unit 12, Sun Mill Compound, Lower Parel, Mumbai 400013",
  mapQuery: "Sun Mill Compound, Lower Parel, Mumbai",
  social: {
    instagram: "https://instagram.com/prowarmindia",
    facebook: "https://facebook.com/prowarmindia",
    linkedin: "https://linkedin.com/company/prowarmindia",
    youtube: "https://youtube.com/@prowarmindia",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 12500, suffix: "+", label: "Installations completed", note: "Homes, villas and hotels since 2012" },
  { value: 320000, suffix: "+", label: "Sq ft of floor warmed", note: "From Srinagar chalets to Mumbai penthouses" },
  { value: 40, suffix: "%", label: "Lower running costs", note: "Versus conventional space heating" },
  { value: 98, suffix: "%", label: "Customers who'd recommend us", note: "Post-installation survey, 2025" },
] as const;

export const partners = [
  "Prestige Group",
  "Sobha Realty",
  "DLF Homes",
  "Godrej Properties",
  "Brigade Group",
  "Oberoi Realty",
  "Tata Housing",
  "L&T Realty",
] as const;

export const testimonials = [
  {
    quote:
      "We tiled the entire ground floor in Kota stone, which turns ice-cold in a Delhi winter. ProWarm's electric mats went in under the tile in two days, and now it's the warmest room in the house. The running cost genuinely surprised us — about the price of a ceiling fan per room.",
    name: "Meera Chandran",
    role: "Homeowner, New Delhi",
  },
  {
    quote:
      "As an architect I specify radiant floors on most premium projects now. ProWarm is the only Indian supplier I've worked with that submits full heat-loss calculations and CAD layouts before a single mat is rolled out. Their site discipline is excellent.",
    name: "Kabir Sethi",
    role: "Principal Architect, Studio Terra, Bengaluru",
  },
  {
    quote:
      "Our boutique hotel in Manali runs ProWarm hydronic floors across 22 rooms. Guests notice the warmth the moment they walk in barefoot — no radiators, no noise, no dry air. Two winters in, zero callouts.",
    name: "Anjali Thakur",
    role: "Owner, Cedar House Manali",
  },
  {
    quote:
      "The SenseWarm thermostat schedule means the bathroom floor is warm at 6 a.m. and off by 9. Installation was tidy, the crew explained everything, and the app support team actually picks up the phone.",
    name: "Rohit Banerjee",
    role: "Homeowner, Gurugram",
  },
  {
    quote:
      "We retrofitted heating under engineered oak in a 40-year-old Srinagar home. ProWarm's low-profile boards added barely 18 mm of height. The whole family lives on the floor again in winter — the way it should be.",
    name: "Farah Wani",
    role: "Homeowner, Srinagar",
  },
] as const;
