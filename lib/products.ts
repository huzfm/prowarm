export type ProductCategory =
  | "electric"
  | "hydronic"
  | "thermostats"
  | "insulation"
  | "accessories";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  price: string;
  priceValue: number; // for sorting
  description: string[];
  features: string[];
  specs: Record<string, string>;
  floors: string[];
  images: { src: string; alt: string }[];
  featured?: boolean;
}

export const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "electric", label: "Electric heating" },
  { value: "hydronic", label: "Water-based" },
  { value: "thermostats", label: "Thermostats" },
  { value: "insulation", label: "Insulation" },
  { value: "accessories", label: "Accessories" },
];

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const products: Product[] = [
  {
    slug: "stickymat-200",
    name: "StickyMat 200W Heating Mat",
    category: "electric",
    tagline: "Our best-selling electric mat for tile and stone floors",
    price: "From ₹1,450 / m²",
    priceValue: 1450,
    description: [
      "The StickyMat 200W is a self-adhesive electric heating mat engineered for the floors Indian homes actually have  vitrified tile, marble, granite and Kota stone. The twin-conductor cable is pre-spaced on an adhesive mesh, so it rolls out flat, sticks down without tape and tiles over directly with flexible adhesive.",
      "At just 3 mm thick, it adds virtually no height to the floor build-up, making it ideal for renovations where door thresholds and finished levels are fixed. Paired with a SenseWarm thermostat, most bathrooms reach barefoot comfort in under 20 minutes.",
    ],
    features: [
      "Self-adhesive mesh  no staples, no movement while tiling",
      "3 mm ultra-thin twin-conductor cable, zero EMF design",
      "Warms tile and stone from cold in 15–25 minutes",
      "IPX7-rated, safe for bathrooms and wet rooms",
      "10-year full-replacement warranty",
    ],
    specs: {
      Output: "200 W/m²",
      Thickness: "3 mm",
      "Cable type": "Twin-conductor, fluoropolymer insulated",
      Voltage: "230 V AC",
      Sizes: "1 m² to 12 m² mats",
      "Floor finishes": "Tile, stone, marble, granite",
      Warranty: "10 years",
    },
    floors: ["Tile", "Stone", "Marble"],
    images: [
      { src: u("photo-1631679706909-1844bbd07221", 1400), alt: "Freshly tiled bathroom floor warmed by a StickyMat electric heating mat" },
      { src: u("photo-1584622650111-993a426fbf0a", 1400), alt: "Modern bathroom with heated stone-tiled flooring" },
      { src: u("photo-1600566752355-35792bedcfea", 1400), alt: "Warm neutral-toned bathroom interior with underfloor heating" },
    ],
    featured: true,
  },
  {
    slug: "flexcable-kit",
    name: "FlexCable Loose Wire Kit",
    category: "electric",
    tagline: "Free-form heating cable for awkward and curved layouts",
    price: "From ₹1,150 / m²",
    priceValue: 1150,
    description: [
      "Not every room is a rectangle. The FlexCable kit gives installers a free-form heating cable that snakes around curved shower trays, pillars, vanity units and heritage floor layouts where a fixed mat won't fit.",
      "The cable clips into supplied fixing strips at whatever spacing your heat-loss calculation demands  tighter runs for a cold ground floor slab, wider for a well-insulated bedroom. It's the system our own engineers reach for on complex sites.",
    ],
    features: [
      "Routes around curves, columns and fixed furniture",
      "Adjustable spacing tunes output from 100–200 W/m²",
      "Single cold-tail connection for simple wiring",
      "Embeds fully in levelling compound  no ridges under vinyl or laminate",
      "10-year full-replacement warranty",
    ],
    specs: {
      Output: "100–200 W/m² (spacing dependent)",
      "Cable diameter": "3.5 mm",
      Voltage: "230 V AC",
      Lengths: "10 m to 150 m",
      "Floor finishes": "Tile, stone, vinyl, laminate (in levelling compound)",
      Warranty: "10 years",
    },
    floors: ["Tile", "Vinyl", "Laminate"],
    images: [
      { src: u("photo-1504307651254-35680f356dfd", 1400), alt: "Installer laying flexible heating cable across a prepared subfloor" },
      { src: u("photo-1581092160562-40aa08e78837", 1400), alt: "Engineer checking a floor heating cable installation" },
    ],
  },
  {
    slug: "warmfoil-kit",
    name: "WarmFoil Underlaminate Kit",
    category: "electric",
    tagline: "Dry-fit foil heating for laminate and engineered wood",
    price: "From ₹1,650 / m²",
    priceValue: 1650,
    description: [
      "WarmFoil is a completely dry installation  no adhesive, no levelling compound, no waiting. The aluminium foil heater rolls out over insulation underlay, the laminate or engineered wood floor floats directly on top, and the room is heatable the same day.",
      "The foil spreads heat evenly across the whole surface, eliminating the striping that cheap cable systems can telegraph through thin floor finishes. Gentle, even warmth that engineered timber manufacturers approve.",
    ],
    features: [
      "100% dry fit  floor down and warm in a single day",
      "Even, stripe-free heat under thin floor finishes",
      "Earthed aluminium construction for total safety",
      "Compatible with click-lock laminate and engineered wood up to 18 mm",
      "10-year full-replacement warranty",
    ],
    specs: {
      Output: "140 W/m²",
      Thickness: "1 mm",
      Construction: "Earthed aluminium foil element",
      Voltage: "230 V AC",
      "Floor finishes": "Laminate, engineered wood (floated)",
      Warranty: "10 years",
    },
    floors: ["Laminate", "Engineered wood"],
    images: [
      { src: u("photo-1615873968403-89e068629265", 1400), alt: "Engineered wood floor in a warm minimalist living room" },
      { src: u("photo-1586023492125-27b2c045efd7", 1400), alt: "Reading corner on a warm wooden floor" },
    ],
    featured: true,
  },
  {
    slug: "aquaboard-low-profile",
    name: "AquaBoard Low-Profile Hydronic System",
    category: "hydronic",
    tagline: "Retrofit water-based heating at just 18 mm height",
    price: "From ₹2,100 / m²",
    priceValue: 2100,
    description: [
      "AquaBoard brings water-based underfloor heating to existing homes without digging up the slab. Pre-routed gypsum panels accept 12 mm PERT-AL-PERT pipe and build up just 18 mm  thin enough to run through a renovation without rehanging every door.",
      "Connected to a heat pump or gas boiler, AquaBoard delivers the lowest running costs of any system we sell, and its high thermal mass keeps rooms at temperature for hours after the heat source cycles off. The system of choice for Himalayan-belt homes that heat all winter.",
    ],
    features: [
      "Only 18 mm build-up  genuinely retrofittable",
      "Works with heat pumps at low flow temperatures (35 °C)",
      "Cheapest running cost per m² of any ProWarm system",
      "Pre-routed panels cut installation time by half",
      "25-year warranty on pipework",
    ],
    specs: {
      "Build-up height": "18 mm + floor finish",
      Pipe: "12 mm PERT-AL-PERT, 25-year warranty",
      "Flow temperature": "35–55 °C",
      "Heat source": "Heat pump, gas boiler or solar thermal",
      "Floor finishes": "Tile, stone, engineered wood, vinyl",
      Warranty: "25 years (pipe), 10 years (panels)",
    },
    floors: ["Tile", "Stone", "Engineered wood", "Vinyl"],
    images: [
      { src: u("photo-1600585154340-be6161a56a0c", 1400), alt: "Contemporary living space heated by a low-profile hydronic floor system" },
      { src: u("photo-1600607687939-ce8a6c25118c", 1400), alt: "Open-plan interior with seamless heated flooring" },
    ],
    featured: true,
  },
  {
    slug: "aquaflow-screed",
    name: "AquaFlow Screed System",
    category: "hydronic",
    tagline: "New-build hydronic heating, cast into the structural screed",
    price: "From ₹1,700 / m²",
    priceValue: 1700,
    description: [
      "For new construction, nothing beats pipe in screed. The AquaFlow system clips 16 mm pipe to insulated castellated panels before the screed is poured, turning the entire slab into a silent, invisible radiator that heats the whole home from below.",
      "Designed room-by-room from your architect's drawings, each circuit is pressure-tested before the pour and balanced at the manifold after. This is the system running under our largest hotel and villa projects in Himachal, Uttarakhand and Kashmir.",
    ],
    features: [
      "Whole-home heating with zero visible hardware",
      "Slab thermal mass holds warmth through the night",
      "Each circuit pressure-tested before the screed pour",
      "Zoned room-by-room from a central manifold",
      "25-year warranty on pipework",
    ],
    specs: {
      Pipe: "16 mm PERT-AL-PERT, 25-year warranty",
      "Panel type": "Castellated, with 20 mm XPS insulation",
      "Screed depth": "50–75 mm",
      "Flow temperature": "35–55 °C",
      "Heat source": "Heat pump, gas boiler or solar thermal",
      Warranty: "25 years (pipe)",
    },
    floors: ["Any finish over screed"],
    images: [
      { src: u("photo-1541888946425-d81bb19240f5", 1400), alt: "New-build construction site prepared for a screeded hydronic heating system" },
      { src: u("photo-1600210492486-724fe5c67fb0", 1400), alt: "Finished new-build interior with screeded underfloor heating" },
    ],
  },
  {
    slug: "sensewarm-pro",
    name: "SenseWarm Pro Wi-Fi Thermostat",
    category: "thermostats",
    tagline: "App-controlled warmth that learns your routine",
    price: "₹12,900",
    priceValue: 12900,
    description: [
      "The SenseWarm Pro is the brain of a ProWarm floor. Its dual sensors read both air and floor temperature, protecting delicate wood finishes while holding the room exactly where you want it. The learning schedule notices when you actually use each room and quietly trims run-time you don't need.",
      "Control everything from the SenseWarm app  per-room schedules, geofenced away mode, and monthly energy reports in rupees, not kilowatt-hours. Works with Alexa and Google Home.",
    ],
    features: [
      "Dual air + floor sensing protects wooden floors",
      "Self-learning schedule cuts run-time up to 25%",
      "Energy reports in ₹ via the SenseWarm app",
      "Geofencing switches to eco mode when you leave",
      "Alexa and Google Home compatible",
    ],
    specs: {
      Display: '3.5" colour touchscreen',
      Sensors: "Air + floor probe (supplied)",
      "Max load": "16 A (3,600 W)",
      Connectivity: "2.4 GHz Wi-Fi",
      Compatibility: "All ProWarm electric systems; hydronic via actuator",
      Warranty: "5 years",
    },
    floors: [],
    images: [
      { src: u("photo-1585060544812-6b45742d762f", 1400), alt: "Smart thermostat mounted on a wall controlling underfloor heating" },
      { src: u("photo-1558002038-1055907df827", 1400), alt: "Smart home control panel in a modern hallway" },
    ],
    featured: true,
  },
  {
    slug: "sensewarm-dial",
    name: "SenseWarm Dial Thermostat",
    category: "thermostats",
    tagline: "One beautiful dial. No app required.",
    price: "₹6,400",
    priceValue: 6400,
    description: [
      "Not every room needs a schedule. The SenseWarm Dial is a precision-machined rotary thermostat for guest rooms, pooja rooms and rental properties  turn for temperature, press for boost, done.",
      "Behind the simple face sits the same dual-sensor control board as the Pro, with floor-temperature limits to protect wood and vinyl finishes.",
    ],
    features: [
      "Machined aluminium dial with haptic detents",
      "One-press 2-hour boost mode",
      "Floor-limit sensing protects delicate finishes",
      "Fits a standard Indian 3-module back box",
      "5-year warranty",
    ],
    specs: {
      Control: "Rotary dial + press",
      Sensors: "Air + floor probe (supplied)",
      "Max load": "16 A (3,600 W)",
      Mounting: "Standard 3-module back box",
      Compatibility: "All ProWarm electric systems",
      Warranty: "5 years",
    },
    floors: [],
    images: [
      { src: u("photo-1507089947368-19c1da9775ae", 1400), alt: "Minimal white wall with a simple rotary heating control" },
    ],
  },
  {
    slug: "thermabase-xps",
    name: "ThermaBase XPS Insulation Boards",
    category: "insulation",
    tagline: "The single biggest upgrade to running costs",
    price: "From ₹380 / m²",
    priceValue: 380,
    description: [
      "Heat goes wherever it's easiest  and on an uninsulated slab, that's straight down into the ground. ThermaBase XPS boards sit between the subfloor and your heating system, reflecting warmth up into the room instead of losing it below.",
      "On a cold concrete slab, 10 mm of ThermaBase typically halves heat-up time and cuts running cost by up to 50%. It's the first line on every quotation we issue, because it's the best money you'll spend on the whole system.",
    ],
    features: [
      "Halves heat-up times on concrete slabs",
      "Cuts running costs by up to 50%",
      "Cement-coated face tiles over directly",
      "Waterproof  ideal for bathrooms and wet rooms",
      "Compression strength 30 t/m²",
    ],
    specs: {
      Material: "Extruded polystyrene, cement-coated both faces",
      Thickness: "6 mm, 10 mm or 20 mm",
      "Thermal conductivity": "0.032 W/mK",
      "Board size": "1200 × 600 mm",
      "Compressive strength": "300 kPa",
      Warranty: "Lifetime of the floor",
    },
    floors: ["Under any ProWarm system"],
    images: [
      { src: u("photo-1560448204-e02f11c3d0e2", 1400), alt: "Bright renovated apartment interior with insulated heated floors" },
    ],
  },
  {
    slug: "floorprime-leveller",
    name: "FloorPrime Self-Levelling Compound",
    category: "accessories",
    tagline: "A flawless, fast-curing bed for heating cables",
    price: "₹1,850 / 20 kg bag",
    priceValue: 1850,
    description: [
      "FloorPrime is a fibre-reinforced, flexible self-levelling compound formulated specifically for encapsulating heating cables and mats. It flows to a glass-flat finish at 5–40 mm, cures for foot traffic in 4 hours, and accepts tile, vinyl or laminate the next day.",
      "Its flexible polymer blend tolerates the thermal cycling of a heated floor without cracking  something standard levellers aren't designed to do.",
    ],
    features: [
      "Formulated for heated floors  thermally flexible",
      "Walk-on in 4 hours, floor finish in 24",
      "Self-smoothing from 5 mm to 40 mm depth",
      "Protein-free, low-dust formulation",
      "Covers ~4 m² per bag at 3 mm",
    ],
    specs: {
      "Bag size": "20 kg",
      Depth: "5–40 mm",
      "Walk-on time": "4 hours",
      "Cover time": "24 hours",
      Coverage: "~4 m² at 3 mm depth",
      Base: "Fibre-reinforced polymer-modified cement",
    },
    floors: [],
    images: [
      { src: u("photo-1621905251189-08b45d6a269e", 1400), alt: "Tradesperson preparing a floor with self-levelling compound" },
    ],
  },
  {
    slug: "aquaflow-manifold",
    name: "AquaFlow Brass Manifold",
    category: "accessories",
    tagline: "Precision flow control for every hydronic zone",
    price: "From ₹18,500",
    priceValue: 18500,
    description: [
      "The AquaFlow manifold is the distribution heart of a water-based system  nickel-plated brass with individual flow meters, isolation valves and thermometer gauges for every circuit, so each room gets exactly the flow its heat-loss demands.",
      "Available in 2 to 12 port configurations with optional thermoelectric actuators for room-by-room smart zoning through SenseWarm controls.",
    ],
    features: [
      "Nickel-plated brass, pressure-tested to 10 bar",
      "Flow meters on every circuit for precise balancing",
      "Accepts SenseWarm actuators for smart zoning",
      "2–12 port configurations",
      "Supplied with fill, drain and air-vent assemblies",
    ],
    specs: {
      Material: "Nickel-plated brass",
      Ports: "2–12 circuits",
      "Max pressure": "10 bar (test), 6 bar (working)",
      "Flow meters": "0–5 L/min per circuit",
      Connections: '1" primary, ¾" eurocone circuits',
      Warranty: "10 years",
    },
    floors: [],
    images: [
      { src: u("photo-1581094794329-c8112a89af12", 1400), alt: "Precision brass pipework and gauges in a plant room" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export const categoryLabel = (value: ProductCategory) =>
  categories.find((c) => c.value === value)?.label ?? value;
