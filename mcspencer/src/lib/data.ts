export type Category =
  | "Electronics"
  | "Renewable Energy"
  | "Car Spares"
  | "Stationery"
  | "Fashion"
  | "AgroMarket";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  category: Category;
  details?: string[];
};

export const categories: { name: Category; icon: string; image: string }[] = [
  { name: "Renewable Energy",  icon: "Sun",      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop" },
  { name: "Electronics",      icon: "Laptop",   image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop" },
  { name: "Car Spares",       icon: "Car",      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop" },
  { name: "Stationery",       icon: "BookOpen", image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=400&fit=crop" },
  { name: "Fashion",          icon: "Shirt",    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" },
  { name: "AgroMarket",       icon: "Leaf",     image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop" },
];

export const products: Product[] = [

  // ── ELECTRONICS ──────────────────────────────────────────────────────────

  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 256GB — Titanium Black",
    price: 26999,
    description:
      "Galaxy AI meets titanium. The S24 Ultra packs a Snapdragon 8 Gen 3 processor, 200 MP quad-camera system, built-in S Pen, and a 5 000 mAh battery with 45 W fast charging. Imported and sold by authorised SA retailers.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "Snapdragon 8 Gen 3 — 12 GB LPDDR5X RAM",
      "256 GB UFS 4.0 storage",
      "6.8\" Dynamic AMOLED 2X, 2600 nits peak, 120 Hz",
      "200 MP main + 12 MP ultrawide + 10 MP 3× + 50 MP 5× telephoto",
      "5 000 mAh — 45 W wired / 15 W wireless charging",
      "Built-in S Pen with Air Actions",
      "IP68 water resistance",
      "Android 14 with 7-year OS update promise",
    ],
  },

  {
    id: "2",
    name: "Apple MacBook Air 15\" M3 — 8 GB / 256 GB — Midnight",
    price: 27999,
    description:
      "The world's best thin-and-light laptop, now with the M3 chip. Blazing-fast performance, a stunning 15.3-inch Liquid Retina display, and up to 18 hours of battery life — all in a fanless aluminium body.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "Apple M3 chip — 8-core CPU, 10-core GPU",
      "8 GB unified memory / 256 GB SSD",
      "15.3\" Liquid Retina, 2 880 × 1 864, 500 nits",
      "Up to 18-hour battery life",
      "Two Thunderbolt / USB 4 ports + MagSafe 3 + 3.5 mm",
      "1080p FaceTime HD camera",
      "Wi-Fi 6E + Bluetooth 5.3",
      "Fanless — completely silent operation",
    ],
  },

  {
    id: "3",
    name: "Sony BRAVIA XR 65\" X90L 4K HDR Google TV",
    price: 18999,
    description:
      "Sony's Cognitive Processor XR replicates how human eyes focus to deliver natural-looking 4K HDR. Full-array local dimming, Dolby Atmos sound, and Google TV with built-in Chromecast.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e10a?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4e10a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571415060716-baff5f717c3f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "65-inch 4K HDR Full Array LED",
      "Cognitive Processor XR — XR Backlight Master Drive",
      "XR Triluminos Pro — billion+ colours",
      "Acoustic Multi-Audio — speakers track on-screen action",
      "HDMI 2.1 × 2 (4K 120Hz / VRR / ALLM) — ideal for PS5",
      "Google TV with Apple TV+, Netflix, Showmax, DStv Now",
      "Dolby Atmos & DTS:X built-in",
    ],
  },

  {
    id: "4",
    name: "Apple AirPods Pro (2nd Generation) — USB-C",
    price: 5999,
    description:
      "Best-in-class Active Noise Cancellation powered by the H2 chip. Adaptive Audio, Transparency Mode, and up to 30 hours total battery with the case. Works seamlessly across all your Apple devices.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "Apple H2 chip — next-level ANC & transparency",
      "Adaptive Audio — seamlessly blends ANC and transparency",
      "Up to 6 hrs listening / 30 hrs with MagSafe case",
      "IPX4 sweat & water resistance",
      "Personalised Spatial Audio with dynamic head tracking",
      "Touch controls on stem",
      "USB-C charging case",
    ],
  },

  {
    id: "5",
    name: "Bose QuietComfort 45 Wireless Headphones — Black",
    price: 8499,
    description:
      "World-class noise cancellation in an all-day comfort design. TriPort acoustic architecture delivers rich, balanced sound. Switch between full ANC and Aware Mode with one button.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "World-class Bose Active Noise Cancellation",
      "Aware Mode — hear your environment without removing",
      "Up to 24-hour battery life",
      "2.5-hour full charge / 15-min quick charge = 3 hrs",
      "TriPort acoustic architecture",
      "Multi-device Bluetooth pairing",
      "USB-C + 2.5 mm audio cable included",
      "Foldable for travel",
    ],
  },

  {
    id: "6",
    name: "Samsung 27\" Odyssey G5 QHD 165Hz Curved Gaming Monitor",
    price: 6999,
    description:
      "Immersive 1000R curved 27-inch QHD gaming monitor. 165 Hz refresh and 1 ms GTG response make it ideal for competitive gaming, while AMD FreeSync Premium eliminates tearing.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "27\" 2560×1440 QHD VA — 1000R curve",
      "165 Hz refresh rate — 1 ms GTG response",
      "AMD FreeSync Premium — no tearing, no stuttering",
      "125 % sRGB — vivid, accurate colours",
      "HDMI 1.4 × 1 + DisplayPort 1.2 × 1",
      "Height, tilt & pivot adjustable stand",
    ],
  },

  {
    id: "7",
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 1799,
    description:
      "The gold standard of productivity mice. MagSpeed electromagnetic scrolling flies through 1 000 lines in a second. 8 000 DPI, ultra-quiet clicks, and connects to up to 3 devices via Bluetooth or USB Bolt receiver.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615750824032-f9de12c3e4ee?w=800&h=600&fit=crop",
    ],
    category: "Electronics",
    details: [
      "8 000 DPI — tracks on any surface including glass",
      "MagSpeed electromagnetic scroll — 1 000 lines/sec",
      "Ultra-quiet click — 90 % quieter than standard",
      "USB-C rechargeable — 70-day battery",
      "Multi-device: Bluetooth + Logi Bolt USB receiver",
      "7 buttons — all customisable via Logi Options+",
    ],
  },

  // ── SOLAR & RENEWABLE ─────────────────────────────────────────────────────

  {
    id: "8",
    name: "Sunsynk 8kW Hybrid Inverter — Single Phase",
    price: 39999,
    description:
      "South Africa's most trusted hybrid inverter. The Sunsynk 8kW handles grid-tied, off-grid, and backup operation. 160 A MPPT, wide PV voltage window, and app monitoring via SolarmanPV. Includes a 5-year SA warranty.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    ],
    category: "Renewable Energy",
    details: [
      "8 000 W continuous output — single phase 230 V",
      "160 A dual MPPT solar charger (max 500 V PV input)",
      "Lithium (BMS) & lead-acid battery compatible",
      "Grid-tied, off-grid & hybrid backup modes",
      "Wi-Fi monitoring via SolarmanPV app (Android & iOS)",
      "Zero-export mode available",
      "5-year South Africa warranty",
    ],
  },

  {
    id: "9",
    name: "Pylontech US3000C 3.5 kWh LiFePO4 Stackable Battery",
    price: 18999,
    description:
      "Pylontech's US3000C is the benchmark lithium battery for South African homes. Grade-A LiFePO4 cells, built-in BMS, 6 000+ cycle life, and stackable up to 8 units. Compatible with Sunsynk, Deye, Victron, and Goodwe inverters.",
    image: "https://images.unsplash.com/photo-1611365892117-bce571e5b2c0?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611365892117-bce571e5b2c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
    ],
    category: "Renewable Energy",
    details: [
      "3.55 kWh usable capacity @ 48 V (LiFePO4)",
      "Grade-A cells — 6 000+ charge cycles",
      "Max 8 units in parallel (up to 28.4 kWh)",
      "Built-in BMS with over-voltage & short-circuit protection",
      "CAN + RS485 communication",
      "Compatible: Sunsynk, Deye, Victron, Goodwe, SolarEdge",
      "2-year full replacement warranty in SA",
    ],
  },

  {
    id: "10",
    name: "Canadian Solar 550W HiKu6 Mono PERC Solar Panel",
    price: 3699,
    description:
      "Canadian Solar is a Tier 1 manufacturer with bankable 25-year performance guarantees. The HiKu6 uses M10 half-cut mono PERC cells for superior low-light performance — ideal for South African rooftops and ground mounts.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
    ],
    category: "Renewable Energy",
    details: [
      "550 W peak power — module efficiency 21.4 %",
      "M10 (182 mm) half-cut mono PERC cells",
      "Low-light performance — ideal for cloudy conditions",
      "Temperature coefficient: -0.35 %/°C",
      "IEC 61215 / IEC 61730 / MCS certified",
      "25-year linear power output warranty",
      "10-year product workmanship warranty",
      "Aluminium alloy frame — 2 400 Pa snow, 2 400 Pa wind load",
    ],
  },

  {
    id: "11",
    name: "Victron SmartSolar MPPT 100/50 Charge Controller",
    price: 5299,
    description:
      "The Victron SmartSolar MPPT 100/50 is the most installed solar charge controller in South Africa. Ultra-fast maximum power point tracking, Bluetooth built in, and full VictronConnect app monitoring. Charges lithium and lead-acid batteries.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
    ],
    category: "Renewable Energy",
    details: [
      "Max PV open-circuit voltage: 100 V",
      "Max charge current: 50 A",
      "Ultra-fast tracking: < 1 ms response time",
      "Bluetooth built-in — VictronConnect app (iOS & Android)",
      "Lithium, Gel, AGM, flooded & custom battery profiles",
      "Networked with other Victron devices via VE.Direct",
      "5-year warranty",
    ],
  },

  {
    id: "12",
    name: "Deye SUN-5K-SG03LP1 5kW Hybrid Inverter (Low Voltage)",
    price: 24999,
    description:
      "The Deye 5kW low-voltage hybrid is South Africa's best-value inverter for homes with a 48V lithium battery bank. Single-phase 230V output, dual MPPT, and compatible with Pylontech, BSL, and most lithium brands.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
    ],
    category: "Renewable Energy",
    details: [
      "5 000 W continuous output — single phase",
      "Dual MPPT — max 6 500 W solar input",
      "Low-voltage battery: 40–60 V (48 V bank)",
      "Max charge current: 100 A",
      "Works with Pylontech, BSL, Hubble AM-5, Greenrich",
      "Wi-Fi monitoring via SolarmanPV",
      "2-year warranty with SA support",
    ],
  },

  // ── CAR SPARES ─────────────────────────────────────────────────────────────

  {
    id: "13",
    name: "Castrol EDGE 5W-30 LL Fully Synthetic 5L",
    price: 599,
    description:
      "Castrol EDGE with Fluid Titanium Technology is three times stronger against viscosity breakdown than conventional oils. Meets the latest standards from VW, BMW, Mercedes-Benz, and most modern petrol/diesel engines sold in SA.",
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    category: "Car Spares",
    details: [
      "Fully synthetic 5W-30 engine oil — 5-litre",
      "Fluid Titanium Technology — 3× stronger film strength",
      "Meets VW 504.00/507.00, BMW LL-04, MB 229.51",
      "Suitable for petrol and diesel engines with DPF",
      "Extended drain intervals up to 30 000 km (OEM guided)",
      "Reduces friction under high performance driving",
    ],
  },

  {
    id: "14",
    name: "NGK BKR6EIX-11 Iridium IX Spark Plugs — Pack of 4",
    price: 449,
    description:
      "NGK's finest iridium plugs feature a 0.6 mm iridium centre electrode for a precise, strong spark. Perfect fit for Toyota, Volkswagen, and Hyundai 4-cylinder engines — the most common cars on SA roads.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
    ],
    category: "Car Spares",
    details: [
      "0.6 mm iridium centre electrode — superior spark",
      "Pack of 4 — covers all 4-cylinder engines",
      "Fits: Toyota Corolla 2009–2023, VW Polo 1.4/1.6 TSI, Hyundai i20/i30",
      "Service life up to 80 000 km",
      "Trivalent metal plating — prevents seizing and corrosion",
      "Resistor type — suppresses radio frequency interference",
    ],
  },

  {
    id: "15",
    name: "Bosch Aerotwin Wiper Blade Set — AP22U + AP19U (545+475 mm)",
    price: 499,
    description:
      "Bosch Aerotwin flat wipers give a clear view in all SA weather. The aerodynamic spoiler design maintains contact at motorway speeds, and the patented dual rubber compound lasts up to 40 % longer than conventional wipers.",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    ],
    category: "Car Spares",
    details: [
      "Set of 2 — 550 mm driver + 475 mm passenger",
      "Aerodynamic flat blade design — no pressure points",
      "Dual rubber compound — 40 % longer life",
      "Direct-fit adapter included (most SA vehicles)",
      "Fits: Toyota Corolla, VW Golf, Ford Fiesta, Hyundai Tucson",
      "OEM quality — fitted as standard by most manufacturers",
    ],
  },

  {
    id: "16",
    name: "Mobil 1 ESP 5W-30 Fully Synthetic 5L",
    price: 649,
    description:
      "Mobil 1 ESP formula is engineered to protect the latest emission control systems, including DPF and catalytic converters. Outstanding performance for European-spec vehicles widely sold in South Africa.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    category: "Car Spares",
    details: [
      "Fully synthetic 5W-30 engine oil — 5-litre",
      "ESP formula — protects DPF and catalytic converters",
      "Meets BMW LL-04, MB 229.51, VW 504.00/507.00",
      "Also approved: Porsche A40, GM dexos2",
      "SuperSyn anti-wear technology",
      "Excellent cold-start protection down to -40 °C",
    ],
  },

  {
    id: "17",
    name: "Monroe Gas-Magnum Shock Absorber — Front Pair (Toyota Corolla)",
    price: 1999,
    description:
      "Monroe is South Africa's leading shock absorber brand. The Gas-Magnum features high-pressure nitrogen gas technology for consistent, controlled damping. Sold as a front pair for Toyota Corolla 2014–2023 (E170/E210).",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    ],
    category: "Car Spares",
    details: [
      "High-pressure nitrogen gas technology",
      "Pair of 2 — front left & right",
      "Fits: Toyota Corolla 2014–2023 (E170/E210 body)",
      "OEM matched dimensions and valving",
      "Self-adjusting velocity-sensitive valving",
      "3-year / 100 000 km warranty",
    ],
  },

  // ── STATIONERY ─────────────────────────────────────────────────────────────

  {
    id: "18",
    name: "Moleskine Classic Hardcover A5 Ruled Notebook — Black",
    price: 449,
    description:
      "The legendary Moleskine notebook — used by Picasso, Hemingway, and millions of creatives worldwide. 240 pages of 70 gsm ivory paper, elastic closure, ribbon bookmark, and expandable inner pocket.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=600&fit=crop",
    ],
    category: "Stationery",
    details: [
      "240 pages — 70 gsm acid-free ivory paper",
      "A5 format (13 × 21 cm) hardcover",
      "Ruled — 7 mm line spacing",
      "Elastic closure band",
      "Ribbon page marker",
      "Expandable inner back pocket",
      "Lay-flat binding",
    ],
  },

  {
    id: "19",
    name: "Parker IM Ballpoint Pen — Matte Black with Gold Trim",
    price: 449,
    description:
      "The Parker IM delivers a premium writing experience in a confident, contemporary design. The medium-point blue Quink ballpoint cartridge is smooth and reliable — refillable for a lifetime of writing.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=600&fit=crop",
    ],
    category: "Stationery",
    details: [
      "Matte black lacquer finish with gold-tone trim",
      "Medium-point Quink blue ballpoint",
      "Retractable push-button mechanism",
      "Refillable — accepts Parker Quink G2 refills",
      "Gift box included",
      "Suitable for corporate gifting",
    ],
  },

  {
    id: "20",
    name: "Pilot G2 Gel Ink Rollerball Pen 0.7 mm — 12-Pack (Blue)",
    price: 229,
    description:
      "America's #1 selling pen — now widely available across South Africa. The G2 retractable gel pen delivers a smooth, skip-free write. Refillable, comfortable rubber grip, and available in the 0.7 mm everyday point.",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop",
    ],
    category: "Stationery",
    details: [
      "Pack of 12 — all blue ink",
      "0.7 mm gel tip — fine, smooth line",
      "Refillable — accepts Pilot G2 ink refills",
      "Rubberised comfort grip",
      "Retractable push-button — no cap to lose",
      "Acid-free, fade-resistant gel ink",
    ],
  },

  {
    id: "21",
    name: "Stabilo BOSS Original Highlighters — 8-Colour Set",
    price: 179,
    description:
      "The original fluorescent highlighter since 1971. Stabilo's wedge tip gives a broad stroke for highlighting or a fine line for underlining. Ink-stop reservoir prevents drying even with the cap off for 4 hours.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop",
    ],
    category: "Stationery",
    details: [
      "8 classic fluorescent colours",
      "Wedge tip — 2 mm fine / 5 mm broad stroke",
      "Ink-stop reservoir — stays moist if cap forgotten",
      "Non-bleed through most 80 gsm photocopy paper",
      "Ventilated cap — child safety standard",
      "Light-fast ink — won't fade on photocopies",
    ],
  },

  {
    id: "22",
    name: "Faber-Castell Goldfaber Colour Pencils — 48-Piece Tin",
    price: 549,
    description:
      "Faber-Castell Goldfaber pencils offer artist-quality colour in a set accessible to students and hobbyists. Thick 3.3 mm hexagonal leads are break-resistant and blend beautifully. A top seller in South African art shops.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    ],
    category: "Stationery",
    details: [
      "48 lightfast colours in a metal storage tin",
      "3.3 mm hexagonal leads — break-resistant",
      "Superior pigmentation — rich, deep colour laydown",
      "SV bond — glued along entire length, won't break when dropped",
      "Pre-sharpened, ready to use",
      "CE certified — safe for school use",
    ],
  },

  // ── FASHION ───────────────────────────────────────────────────────────────

  {
    id: "23",
    name: "Levi's 501 Original Fit Jeans — Dark Stonewash (Men's)",
    price: 1299,
    description:
      "The original jeans since 1873. Levi's 501 sit at the waist, are straight through the hip, thigh and leg, and button-fly. 100 % cotton denim that softens and shapes to your body over time. Officially distributed in SA.",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=600&fit=crop",
    ],
    category: "Fashion",
    details: [
      "100 % cotton sanforized denim",
      "Original fit — straight leg, sits at waist",
      "Button fly — 5-pocket styling",
      "Dark stonewash — versatile, smart-casual",
      "Available in waist 28–38, leg 30/32/34",
      "Machine washable — cold, inside out",
    ],
  },

  {
    id: "24",
    name: "Nike Air Max 270 — Black / White (Men's)",
    price: 2999,
    description:
      "The Air Max 270 features Nike's biggest heel Air unit for all-day cushioning. A sleek mesh upper keeps feet cool, while the foam midsole delivers a plush ride from morning commute to weekend casual wear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=600&fit=crop",
    ],
    category: "Fashion",
    details: [
      "270° Max Air heel unit — biggest in Nike lifestyle shoes",
      "Lightweight mesh upper — breathable",
      "Foam midsole for all-day comfort",
      "Rubber outsole — durable traction",
      "Available in UK sizes 6–12",
      "Officially distributed in South Africa",
    ],
  },

  {
    id: "25",
    name: "Nike Club Fleece Pullover Hoodie — Black (Unisex)",
    price: 1099,
    description:
      "A wardrobe essential — Nike Club Fleece is soft, warm, and incredibly versatile. The relaxed fit works for workouts or everyday wear. A Joburg winter must-have.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop",
    ],
    category: "Fashion",
    details: [
      "80 % cotton / 20 % polyester fleece",
      "Relaxed fit — unisex sizing (XS–XXL)",
      "Kangaroo pocket — hand warmer & storage",
      "Ribbed cuffs, hem & hood",
      "Embroidered Swoosh on chest",
      "Machine washable",
    ],
  },

  {
    id: "26",
    name: "Adidas Ultraboost 22 Running Shoes — Core Black (Men's)",
    price: 3299,
    description:
      "Built for distance runners. The Ultraboost 22 features adidas's Boost midsole — 3 000 energy-return capsules that keep you feeling fresh mile after mile. A top pick for Cape Town and Durban marathon runners.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=600&fit=crop",
    ],
    category: "Fashion",
    details: [
      "Primeknit+ upper — adaptive, sock-like fit",
      "Boost midsole — 3 000+ energy capsules",
      "Linear Energy Push system — propulsive feel",
      "Continental Rubber™ outsole — grip on wet roads",
      "Available UK sizes 6–13",
      "8 mm heel-to-toe drop",
    ],
  },

  {
    id: "27",
    name: "Fossil Neutra Chronograph Stainless Steel Watch — Silver",
    price: 3499,
    description:
      "Fossil's Neutra Chronograph is a clean, sophisticated dress watch with a working stopwatch, date window, and mineral crystal glass. Water resistant to 50 m. An exceptional everyday accessory for the SA professional.",
    image: "https://images.unsplash.com/photo-1523170335258-f87a3388eb8b?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f87a3388eb8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop",
    ],
    category: "Fashion",
    details: [
      "44 mm stainless steel case & bracelet",
      "Quartz chronograph — split-second stopwatch",
      "Date window at 6 o'clock",
      "Mineral crystal glass — scratch resistant",
      "Water resistant to 50 m (5 ATM)",
      "Deployment clasp with safety push-button",
      "2-year international manufacturer warranty",
    ],
  },

  // ── AGROMARKET ────────────────────────────────────────────────────────────

  {
    id: "28",
    name: "Kirchhoffs Wonder Fertiliser 8:1:5 (SR) 5 kg",
    price: 189,
    description:
      "South Africa's most trusted garden fertiliser for over 70 years. The 8:1:5 SR blend is ideal for lawns, vegetables, and fruit trees — slow-release nitrogen means fewer applications and lush, dark-green growth.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
    ],
    category: "AgroMarket",
    details: [
      "NPK 8:1:5 with sulphur — slow-release nitrogen",
      "5 kg resealable bag",
      "Suitable for: lawns, vegetables, fruit trees, roses",
      "SABS-certified organic / inorganic blend",
      "Apply every 6–8 weeks during growing season",
      "Child & pet safe once watered in",
    ],
  },

  {
    id: "29",
    name: "Kärcher K4 Power Control Home Pressure Washer",
    price: 4999,
    description:
      "The K4 Power Control is perfectly suited for stubborn dirt on patios, vehicles, garden furniture, and driveways. The integrated power control on the gun adjusts pressure without returning to the machine. Includes the dirt blaster and Vario Power jet.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416752037-f48d27d02ae2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    category: "AgroMarket",
    details: [
      "1 800 W motor — max 130 bar / 420 L/hr flow",
      "Power control on gun — adjusts pressure without leaving machine",
      "Vario Power Jet — adjustable from rinse to jet",
      "Dirt Blaster rotating nozzle — penetrates heavy grime",
      "Induction motor — for continuous use without overheating",
      "5 m high-pressure hose + 8 m water inlet hose",
      "3-year Kärcher warranty (SA)",
    ],
  },

  {
    id: "30",
    name: "Husqvarna 135 Mark II Petrol Chainsaw — 14\" Bar",
    price: 5499,
    description:
      "The 135 Mark II is Husqvarna's best-selling homeowner chainsaw. X-Torq engine burns up to 20 % less fuel and emits 75 % fewer hydrocarbons than older technology. Inertia-activated chain brake for safety. Ideal for SA smallholder firewood cutting.",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416752037-f48d27d02ae2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    ],
    category: "AgroMarket",
    details: [
      "38.2 cc X-Torq® engine — low emissions",
      "14-inch (35 cm) guide bar & saw chain",
      "Inertia-activated chain brake",
      "Air Injection® centrifugal air cleaning — extends filter life",
      "Smart Start® — engine starts with minimum effort",
      "LowVib® anti-vibration system",
      "Carry case + bar cover included",
    ],
  },

  {
    id: "31",
    name: "Netafim Techline Drip Irrigation Kit — 50 Plants",
    price: 649,
    description:
      "Netafim invented drip irrigation in 1965 and still sets the global standard. The Techline CV kit delivers precise water to 50 plant positions with pressure-compensating emitters that ensure equal distribution regardless of terrain.",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    ],
    category: "AgroMarket",
    details: [
      "Covers 50 plants or 25 m single row",
      "Pressure-compensating emitters — equal flow on slopes",
      "Self-flushing — prevents clogging",
      "UV-stabilised polyethylene tubing",
      "Compatible with 12 V and battery-operated timers",
      "All connectors, stakes & end caps included",
      "Netafim 10-year product warranty",
    ],
  },

];
