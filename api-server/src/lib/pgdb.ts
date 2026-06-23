import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.MCSPENCER_DB_URL ?? process.env.DATABASE_URL;

const isExternal = connectionString
  ? /neon\.tech|supabase|render\.com|amazonaws|digitalocean|cockroachlabs/.test(connectionString)
  : false;

const pool = new Pool({
  connectionString,
  ssl: isExternal ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 8000,
});

export default pool;

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}

interface SeedProduct {
  name: string; description: string; price: number;
  category: string; image: string; images: string[]; details: string[];
}

const SEED_PRODUCTS: SeedProduct[] = [
  { name: "Samsung Galaxy S24 Ultra 256GB — Titanium Black", price: 26999, category: "Electronics",
    description: "Galaxy AI meets titanium. The S24 Ultra packs a Snapdragon 8 Gen 3 processor, 200 MP quad-camera system, built-in S Pen, and a 5 000 mAh battery with 45 W fast charging.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=600&fit=crop"],
    details: ["Snapdragon 8 Gen 3 — 12 GB LPDDR5X RAM","256 GB UFS 4.0 storage","6.8\" Dynamic AMOLED 2X, 2600 nits peak, 120 Hz","200 MP main + 12 MP ultrawide + 10 MP 3× + 50 MP 5× telephoto","5 000 mAh — 45 W wired / 15 W wireless charging","Built-in S Pen with Air Actions","IP68 water resistance"] },
  { name: "Apple MacBook Air 15\" M3 — 8 GB / 256 GB — Midnight", price: 27999, category: "Electronics",
    description: "The world's best thin-and-light laptop, now with the M3 chip. Blazing-fast performance, a stunning 15.3-inch Liquid Retina display, and up to 18 hours of battery life.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop"],
    details: ["Apple M3 chip — 8-core CPU, 10-core GPU","8 GB unified memory / 256 GB SSD","15.3\" Liquid Retina, 2 880 × 1 864, 500 nits","Up to 18-hour battery life","Two Thunderbolt / USB 4 ports + MagSafe 3","1080p FaceTime HD camera","Fanless — completely silent operation"] },
  { name: "Sony BRAVIA XR 65\" X90L 4K HDR Google TV", price: 18999, category: "Electronics",
    description: "Sony's Cognitive Processor XR replicates how human eyes focus to deliver natural-looking 4K HDR. Full-array local dimming, Dolby Atmos sound, and Google TV with built-in Chromecast.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e10a?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f4e10a?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1571415060716-baff5f717c3f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800&h=600&fit=crop"],
    details: ["65-inch 4K HDR Full Array LED","Cognitive Processor XR","XR Triluminos Pro — billion+ colours","HDMI 2.1 × 2 (4K 120Hz / VRR / ALLM)","Google TV with Apple TV+, Netflix, Showmax","Dolby Atmos & DTS:X built-in"] },
  { name: "Apple AirPods Pro (2nd Generation) — USB-C", price: 5999, category: "Electronics",
    description: "Best-in-class Active Noise Cancellation powered by the H2 chip. Adaptive Audio, Transparency Mode, and up to 30 hours total battery with the case.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"],
    details: ["Apple H2 chip — next-level ANC & transparency","Adaptive Audio","Up to 6 hrs listening / 30 hrs with MagSafe case","IPX4 sweat & water resistance","Personalised Spatial Audio with dynamic head tracking","USB-C charging case"] },
  { name: "Bose QuietComfort 45 Wireless Headphones — Black", price: 8499, category: "Electronics",
    description: "World-class noise cancellation in an all-day comfort design. TriPort acoustic architecture delivers rich, balanced sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"],
    details: ["World-class Bose Active Noise Cancellation","Aware Mode","Up to 24-hour battery life","TriPort acoustic architecture","Multi-device Bluetooth pairing","USB-C + 2.5 mm audio cable included"] },
  { name: "Samsung 27\" Odyssey G5 QHD 165Hz Curved Gaming Monitor", price: 6999, category: "Electronics",
    description: "Immersive 1000R curved 27-inch QHD gaming monitor. 165 Hz refresh and 1 ms GTG response make it ideal for competitive gaming.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&h=600&fit=crop"],
    details: ["27\" 2560×1440 QHD VA — 1000R curve","165 Hz refresh rate — 1 ms GTG response","AMD FreeSync Premium","125 % sRGB","HDMI 1.4 × 1 + DisplayPort 1.2 × 1","Height, tilt & pivot adjustable stand"] },
  { name: "Logitech MX Master 3S Wireless Mouse", price: 1799, category: "Electronics",
    description: "The gold standard of productivity mice. MagSpeed electromagnetic scrolling flies through 1 000 lines in a second. 8 000 DPI and connects to up to 3 devices.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1615750824032-f9de12c3e4ee?w=800&h=600&fit=crop"],
    details: ["8 000 DPI — tracks on any surface including glass","MagSpeed electromagnetic scroll — 1 000 lines/sec","Ultra-quiet click — 90 % quieter than standard","USB-C rechargeable — 70-day battery","Multi-device: Bluetooth + Logi Bolt USB receiver"] },
  { name: "Sunsynk 8kW Hybrid Inverter — Single Phase", price: 39999, category: "Renewable Energy",
    description: "South Africa's most trusted hybrid inverter. The Sunsynk 8kW handles grid-tied, off-grid, and backup operation. Includes a 5-year SA warranty.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"],
    details: ["8 000 W continuous output — single phase 230 V","160 A dual MPPT solar charger (max 500 V PV input)","Lithium (BMS) & lead-acid battery compatible","Wi-Fi monitoring via SolarmanPV app","Zero-export mode available","5-year South Africa warranty"] },
  { name: "Pylontech US3000C 3.5 kWh LiFePO4 Stackable Battery", price: 18999, category: "Renewable Energy",
    description: "Pylontech's US3000C is the benchmark lithium battery for South African homes. Grade-A LiFePO4 cells, built-in BMS, 6 000+ cycle life, and stackable up to 8 units.",
    image: "https://images.unsplash.com/photo-1611365892117-bce571e5b2c0?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1611365892117-bce571e5b2c0?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop"],
    details: ["3.55 kWh usable capacity @ 48 V (LiFePO4)","Grade-A cells — 6 000+ charge cycles","Max 8 units in parallel (up to 28.4 kWh)","Built-in BMS with over-voltage & short-circuit protection","CAN + RS485 communication","Compatible: Sunsynk, Deye, Victron, Goodwe, SolarEdge"] },
  { name: "Canadian Solar 550W HiKu6 Mono PERC Solar Panel", price: 3699, category: "Renewable Energy",
    description: "Canadian Solar is a Tier 1 manufacturer with bankable 25-year performance guarantees. M10 half-cut mono PERC cells for superior low-light performance.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop"],
    details: ["550 W peak power — module efficiency 21.4 %","M10 (182 mm) half-cut mono PERC cells","Low-light performance","Temperature coefficient: -0.35 %/°C","25-year linear power output warranty","10-year product workmanship warranty"] },
  { name: "Victron SmartSolar MPPT 100/50 Charge Controller", price: 5299, category: "Renewable Energy",
    description: "The most installed solar charge controller in South Africa. Ultra-fast MPPT, Bluetooth built in, and full VictronConnect app monitoring.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop"],
    details: ["Max PV open-circuit voltage: 100 V","Max charge current: 50 A","Ultra-fast tracking: < 1 ms response time","Bluetooth built-in — VictronConnect app","Lithium, Gel, AGM, flooded & custom battery profiles","5-year warranty"] },
  { name: "Deye SUN-5K-SG03LP1 5kW Hybrid Inverter (Low Voltage)", price: 24999, category: "Renewable Energy",
    description: "South Africa's best-value inverter for homes with a 48V lithium battery bank. Single-phase 230V output, dual MPPT, compatible with Pylontech and BSL.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop"],
    details: ["5 000 W continuous output — single phase","Dual MPPT — max 6 500 W solar input","Low-voltage battery: 40–60 V (48 V bank)","Works with Pylontech, BSL, Hubble AM-5, Greenrich","Wi-Fi monitoring via SolarmanPV","2-year warranty with SA support"] },
  { name: "Castrol EDGE 5W-30 LL Fully Synthetic 5L", price: 599, category: "Car Spares",
    description: "Castrol EDGE with Fluid Titanium Technology is three times stronger against viscosity breakdown. Meets the latest standards from VW, BMW, and Mercedes-Benz.",
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"],
    details: ["Fully synthetic 5W-30 engine oil — 5-litre","Fluid Titanium Technology — 3× stronger film strength","Meets VW 504.00/507.00, BMW LL-04, MB 229.51","Suitable for petrol and diesel engines with DPF","Extended drain intervals up to 30 000 km"] },
  { name: "NGK BKR6EIX-11 Iridium IX Spark Plugs — Pack of 4", price: 449, category: "Car Spares",
    description: "NGK's finest iridium plugs feature a 0.6 mm iridium centre electrode for a precise, strong spark. Perfect fit for Toyota, Volkswagen, and Hyundai 4-cylinder engines.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop"],
    details: ["0.6 mm iridium centre electrode — superior spark","Pack of 4 — covers all 4-cylinder engines","Fits: Toyota Corolla 2009–2023, VW Polo, Hyundai i20/i30","Service life up to 80 000 km","Trivalent metal plating — prevents seizing and corrosion"] },
  { name: "Bosch Aerotwin Wiper Blade Set — AP22U + AP19U", price: 499, category: "Car Spares",
    description: "Bosch Aerotwin flat wipers give a clear view in all SA weather. Aerodynamic spoiler design maintains contact at motorway speeds.",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"],
    details: ["Set of 2 — 550 mm driver + 475 mm passenger","Aerodynamic flat blade design — no pressure points","Dual rubber compound — 40 % longer life","Direct-fit adapter included","Fits: Toyota Corolla, VW Golf, Ford Fiesta, Hyundai Tucson"] },
  { name: "Mobil 1 ESP 5W-30 Fully Synthetic 5L", price: 649, category: "Car Spares",
    description: "Mobil 1 ESP formula is engineered to protect the latest emission control systems, including DPF and catalytic converters.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"],
    details: ["Fully synthetic 5W-30 engine oil — 5-litre","ESP formula — protects DPF and catalytic converters","Meets BMW LL-04, MB 229.51, VW 504.00/507.00","SuperSyn anti-wear technology","Excellent cold-start protection down to -40 °C"] },
  { name: "Monroe Gas-Magnum Shock Absorber — Front Pair (Toyota Corolla)", price: 1999, category: "Car Spares",
    description: "Monroe Gas-Magnum features high-pressure nitrogen gas technology for consistent, controlled damping. Front pair for Toyota Corolla 2014–2023.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"],
    details: ["High-pressure nitrogen gas technology","Pair of 2 — front left & right","Fits: Toyota Corolla 2014–2023 (E170/E210 body)","Self-adjusting velocity-sensitive valving","3-year / 100 000 km warranty"] },
  { name: "Moleskine Classic Hardcover A5 Ruled Notebook — Black", price: 449, category: "Stationery",
    description: "The legendary Moleskine notebook — used by creatives worldwide. 240 pages of 70 gsm ivory paper, elastic closure, ribbon bookmark, and expandable inner pocket.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=600&fit=crop"],
    details: ["240 pages — 70 gsm acid-free ivory paper","A5 format (13 × 21 cm) hardcover","Ruled — 7 mm line spacing","Elastic closure band","Ribbon page marker","Expandable inner back pocket","Lay-flat binding"] },
  { name: "Parker IM Ballpoint Pen — Matte Black with Gold Trim", price: 449, category: "Stationery",
    description: "The Parker IM delivers a premium writing experience in a confident, contemporary design. The medium-point blue Quink ballpoint cartridge is smooth and reliable.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=600&fit=crop"],
    details: ["Matte black lacquer finish with gold-tone trim","Medium-point Quink blue ballpoint","Retractable push-button mechanism","Refillable — accepts Parker Quink G2 refills","Gift box included"] },
  { name: "Pilot G2 Gel Ink Rollerball Pen 0.7 mm — 12-Pack (Blue)", price: 229, category: "Stationery",
    description: "America's #1 selling pen. The G2 retractable gel pen delivers a smooth, skip-free write. Refillable, comfortable rubber grip.",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop"],
    details: ["Pack of 12 — all blue ink","0.7 mm gel tip — fine, smooth line","Refillable — accepts Pilot G2 ink refills","Rubberised comfort grip","Retractable push-button","Acid-free, fade-resistant gel ink"] },
  { name: "Stabilo BOSS Original Highlighters — 8-Colour Set", price: 179, category: "Stationery",
    description: "The original fluorescent highlighter since 1971. Wedge tip gives a broad stroke for highlighting or a fine line for underlining.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop"],
    details: ["8 classic fluorescent colours","Wedge tip — 2 mm fine / 5 mm broad stroke","Ink-stop reservoir — stays moist if cap forgotten","Non-bleed through most 80 gsm paper","Light-fast ink — won't fade on photocopies"] },
  { name: "Faber-Castell Goldfaber Colour Pencils — 48-Piece Tin", price: 549, category: "Stationery",
    description: "Artist-quality colour pencils in a set accessible to students and hobbyists. Thick 3.3 mm hexagonal leads are break-resistant and blend beautifully.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"],
    details: ["48 lightfast colours in a metal storage tin","3.3 mm hexagonal leads — break-resistant","Superior pigmentation — rich, deep colour laydown","SV bond — glued along entire length","Pre-sharpened, ready to use"] },
  { name: "Levi's 501 Original Fit Jeans — Dark Stonewash (Men's)", price: 1299, category: "Fashion",
    description: "The original jeans since 1873. The 501 sit at the waist, straight through the hip, thigh and leg, and button-fly. 100 % cotton denim.",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=600&fit=crop"],
    details: ["100 % cotton sanforized denim","Original fit — straight leg, sits at waist","Button fly — 5-pocket styling","Dark stonewash — versatile, smart-casual","Available in waist 28–38, leg 30/32/34","Machine washable — cold, inside out"] },
  { name: "Nike Air Max 270 — Black / White (Men's)", price: 2999, category: "Fashion",
    description: "The Air Max 270 features Nike's biggest heel Air unit for all-day cushioning. A sleek mesh upper keeps feet cool.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=600&fit=crop"],
    details: ["270° Max Air heel unit — biggest in Nike lifestyle shoes","Lightweight mesh upper — breathable","Foam midsole for all-day comfort","Rubber outsole — durable traction","Available in UK sizes 6–12"] },
  { name: "Nike Club Fleece Pullover Hoodie — Black (Unisex)", price: 1099, category: "Fashion",
    description: "A wardrobe essential — Nike Club Fleece is soft, warm, and incredibly versatile. The relaxed fit works for workouts or everyday wear.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop"],
    details: ["80 % cotton / 20 % polyester fleece","Relaxed fit — unisex sizing (XS–XXL)","Kangaroo pocket","Ribbed cuffs, hem & hood","Embroidered Swoosh on chest","Machine washable"] },
  { name: "Adidas Ultraboost 22 Running Shoes — Core Black (Men's)", price: 3299, category: "Fashion",
    description: "Built for distance runners. The Ultraboost 22 features adidas's Boost midsole — 3 000 energy-return capsules that keep you feeling fresh mile after mile.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=600&fit=crop"],
    details: ["Primeknit+ upper — adaptive, sock-like fit","Boost midsole — 3 000+ energy capsules","Linear Energy Push system — propulsive feel","Continental Rubber™ outsole — grip on wet roads","Available UK sizes 6–13"] },
  { name: "Fossil Neutra Chronograph Stainless Steel Watch — Silver", price: 3499, category: "Fashion",
    description: "A clean, sophisticated dress watch with a working stopwatch, date window, and mineral crystal glass. Water resistant to 50 m.",
    image: "https://images.unsplash.com/photo-1523170335258-f87a3388eb8b?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1523170335258-f87a3388eb8b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop"],
    details: ["44 mm stainless steel case & bracelet","Quartz chronograph — split-second stopwatch","Date window at 6 o'clock","Mineral crystal glass — scratch resistant","Water resistant to 50 m (5 ATM)","2-year international manufacturer warranty"] },
  { name: "Kirchhoffs Wonder Fertiliser 8:1:5 (SR) 5 kg", price: 189, category: "AgroMarket",
    description: "South Africa's most trusted garden fertiliser for over 70 years. The 8:1:5 SR blend is ideal for lawns, vegetables, and fruit trees.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop"],
    details: ["NPK 8:1:5 with sulphur — slow-release nitrogen","5 kg resealable bag","Suitable for: lawns, vegetables, fruit trees, roses","SABS-certified organic / inorganic blend","Apply every 6–8 weeks during growing season","Child & pet safe once watered in"] },
  { name: "Kärcher K4 Power Control Home Pressure Washer", price: 4999, category: "AgroMarket",
    description: "The K4 Power Control is suited for stubborn dirt on patios, vehicles, garden furniture, and driveways. Integrated power control adjusts pressure on the gun.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1416752037-f48d27d02ae2?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"],
    details: ["1 800 W motor — max 130 bar / 420 L/hr flow","Power control on gun","Vario Power Jet — adjustable from rinse to jet","Dirt Blaster rotating nozzle","5 m high-pressure hose + 8 m water inlet hose","3-year Kärcher warranty (SA)"] },
  { name: "Husqvarna 135 Mark II Petrol Chainsaw — 14\" Bar", price: 5499, category: "AgroMarket",
    description: "The 135 Mark II is Husqvarna's best-selling homeowner chainsaw. X-Torq engine burns up to 20 % less fuel. Ideal for SA smallholder firewood cutting.",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1416752037-f48d27d02ae2?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"],
    details: ["38.2 cc X-Torq® engine — low emissions","14-inch (35 cm) guide bar & saw chain","Inertia-activated chain brake","Air Injection® centrifugal air cleaning","Smart Start® — engine starts with minimum effort","Carry case + bar cover included"] },
  { name: "Netafim Techline Drip Irrigation Kit — 50 Plants", price: 649, category: "AgroMarket",
    description: "Netafim invented drip irrigation in 1965. The Techline CV kit delivers precise water to 50 plant positions with pressure-compensating emitters.",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"],
    details: ["Covers 50 plants or 25 m single row","Pressure-compensating emitters — equal flow on slopes","Self-flushing — prevents clogging","UV-stabilised polyethylene tubing","All connectors, stakes & end caps included","Netafim 10-year product warranty"] },
];

async function seedProducts(): Promise<void> {
  console.log(`[db] Seeding ${SEED_PRODUCTS.length} products…`);
  for (const p of SEED_PRODUCTS) {
    await query(
      `INSERT INTO custom_products (name, description, price, category, image, images, stock_count, is_active, is_featured, details)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10::jsonb)`,
      [p.name, p.description, p.price, p.category, p.image,
       JSON.stringify(p.images), 10, true, false, JSON.stringify(p.details)]
    );
  }
  console.log("[db] Seed complete.");
}

export async function initDb(): Promise<void> {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS custom_products (
        id          SERIAL PRIMARY KEY,
        name        TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        price       NUMERIC(10,2) NOT NULL DEFAULT 0,
        category    TEXT NOT NULL DEFAULT 'Electronics',
        image       TEXT NOT NULL DEFAULT '',
        images      JSONB NOT NULL DEFAULT '[]',
        stock_count INTEGER NOT NULL DEFAULT 10,
        is_active   BOOLEAN NOT NULL DEFAULT TRUE,
        is_featured BOOLEAN NOT NULL DEFAULT FALSE,
        details     JSONB NOT NULL DEFAULT '[]',
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await query(`ALTER TABLE custom_products ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'`);
    await query(`ALTER TABLE custom_products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE`);
    await query(`ALTER TABLE custom_products ADD COLUMN IF NOT EXISTS stock_count INTEGER NOT NULL DEFAULT 10`);
    await query(`ALTER TABLE custom_products ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE`);
    const [row] = await query<{ count: string }>(`SELECT COUNT(*) AS count FROM custom_products`);
    if (+row.count === 0) {
      await seedProducts();
    }
  } catch (err) {
    console.error("[db] initDb error:", err);
  }
}
