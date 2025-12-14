import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: "Organic Pantry",
        iconUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=160&q=80",
        imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=80",
        description:
          "Organic pantry staples for everyday cooking: honey, grains, plant milks, and teas with short ingredient lists.",
        exploreInfo:
          "Filter by diet type, origin, and packaging format to find the cleanest pantry swaps for your kitchen.",
      },
      {
        id: 2,
        name: "Eco Home",
        iconUrl: "https://images.unsplash.com/photo-1582719478145-bb4c9b0e3a6d?auto=format&fit=crop&w=160&q=80",
        imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
        description: "Plant-based home care that cuts plastic waste and keeps indoor air clean.",
        exploreInfo: "Shop by room, refill size, and fragrance strength to build a reusable-first cleaning routine.",
      },
      {
        id: 3,
        name: "Natural Beauty",
        iconUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=160&q=80",
        imageUrl: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80",
        description: "Skin and hair care with botanical formulas, refill options, and recyclable packaging.",
        exploreInfo: "Filter by skin type, fragrance-free needs, and solid formats to lower your footprint.",
      },
      {
        id: 4,
        name: "Zero Waste",
        iconUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=160&q=80",
        imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80",
        description: "Durable reusables that replace disposables in the kitchen and on the go.",
        exploreInfo: "Browse by material, capacity, and bundle size to build your zero waste kit.",
      },
      {
        id: 5,
        name: "Sustainable Fashion",
        iconUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=160&q=80",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        description: "Wardrobe essentials made from organic, recycled, and low-impact fibers.",
        exploreInfo: "Filter by material, fit, and care instructions to choose pieces that last.",
      },
    ],
  });

  await prisma.brand.createMany({
    data: [
      {
        id: 1,
        name: "Green Roots",
        imageUrl: "https://placehold.co/160x60/2d6b44/ffffff?text=Green+Roots",
      },
      {
        id: 2,
        name: "Pure Harvest",
        imageUrl: "https://placehold.co/160x60/398755/ffffff?text=Pure+Harvest",
      },
      {
        id: 3,
        name: "EcoWave",
        imageUrl: "https://placehold.co/160x60/6bbd86/0f1510?text=EcoWave",
      },
      {
        id: 4,
        name: "TerraGlow",
        imageUrl: "https://placehold.co/160x60/a66f2a/0f1510?text=TerraGlow",
      },
      {
        id: 5,
        name: "ReUse Lab",
        imageUrl: "https://placehold.co/160x60/3c8e57/ffffff?text=ReUse+Lab",
      },
      {
        id: 6,
        name: "Wild Thread",
        imageUrl: "https://placehold.co/160x60/2d6b44/ffffff?text=Wild+Thread",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        id: 1,
        brandId: 1,
        categoryId: 1,
        name: "Organic Forest Honey",
        description:
          "Raw honey from forest apiaries, spun cold and left unpasteurized to keep enzymes intact.",
        exploreInfo:
          "Stir into herbal teas or pair with sourdough; packed in reusable glass to help you refill locally.",
        price: 11.5,
        discount: 0,
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        brandId: 2,
        categoryId: 1,
        name: "Oat & Almond Granola",
        description:
          "Crunchy granola baked with sprouted oats, roasted almonds, and date syrup instead of refined sugar.",
        exploreInfo:
          "Enjoy as breakfast or topping for plant yogurt; packed in a compostable pouch to cut plastic waste.",
        price: 8.4,
        discount: 1,
        stock: 42,
        imageUrl: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        brandId: 1,
        categoryId: 1,
        name: "Barista Oat Milk",
        description: "Creamy oat milk with organic oats and sunflower oil for reliable foam without gums.",
        exploreInfo:
          "Works hot or iced; shelf-stable pack made from 87% plant-based material and fully recyclable.",
        price: 3.9,
        discount: 0,
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 4,
        brandId: 2,
        categoryId: 1,
        name: "Fair Trade Espresso Beans",
        description:
          "Medium roast arabica sourced from cooperatives with traceable supply chains and fair trade premiums.",
        exploreInfo:
          "Tasting notes of cacao and dried fruit; sold in a recyclable paper valve bag with roast date.",
        price: 13.2,
        discount: 0,
        stock: 34,
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 5,
        brandId: 1,
        categoryId: 1,
        name: "Herbal Calm Tea",
        description:
          "Loose leaf blend of chamomile, lemon balm, and linden harvested in small batches for gentle evenings.",
        exploreInfo: "Caffeine-free and soothing; packed in a tin you can refill in store or repurpose at home.",
        price: 6.8,
        discount: 0,
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1451748266019-10a91ca3d86c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 6,
        brandId: 3,
        categoryId: 2,
        name: "Refillable Multi-Surface Cleaner",
        description:
          "Plant-based concentrate that cuts grease without ammonia or synthetic dyes, safe for most surfaces.",
        exploreInfo: "Use with your own spray bottle; one capsule makes 500 ml of ready-to-use cleaner.",
        price: 7.5,
        discount: 0,
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1598300051073-ff7c5a6c9c1f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 7,
        brandId: 3,
        categoryId: 2,
        name: "Plant-Based Laundry Liquid",
        description:
          "Hypoallergenic detergent with enzymes from fermented corn, effective from 30 degrees without optical brighteners.",
        exploreInfo:
          "Light eucalyptus scent; bottle made with 100% recycled plastic and eligible for a return program.",
        price: 12.3,
        discount: 1,
        stock: 38,
        imageUrl: "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 8,
        brandId: 5,
        categoryId: 2,
        name: "Bamboo Paper Towels (6-pack)",
        description:
          "Strong, reusable bamboo sheets that can be rinsed and air-dried several times before composting.",
        exploreInfo:
          "Each roll replaces up to 60 single-use sheets; coreless roll cuts down on excess packaging.",
        price: 5.6,
        discount: 0,
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1615485290382-441bb0f0b8eb?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 9,
        brandId: 3,
        categoryId: 2,
        name: "Citrus Dish Soap Concentrate",
        description:
          "Highly concentrated dish soap with orange oil and biodegradable surfactants, gentle on skin.",
        exploreInfo: "Dilute 1:3 with water in a pump bottle; greywater safe and scented only with essential oils.",
        price: 6.4,
        discount: 0.4,
        stock: 52,
        imageUrl: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c84?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 10,
        brandId: 5,
        categoryId: 2,
        name: "Wool Dryer Balls (set of 6)",
        description:
          "Hand-felted New Zealand wool balls that shorten drying time, soften fabrics, and reduce static naturally.",
        exploreInfo: "Replace fabric softener sheets; last for hundreds of cycles and come in a cotton drawstring bag.",
        price: 9.9,
        discount: 1.5,
        stock: 27,
        imageUrl: "https://images.unsplash.com/photo-1618912686275-5b0eec2206f1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 11,
        brandId: 4,
        categoryId: 3,
        name: "Botanical Face Oil",
        description:
          "Lightweight blend of jojoba, squalane, and sea buckthorn that sinks in fast and supports everyday glow.",
        exploreInfo: "Refill program available in store; dropper made from recycled glass and easy to disassemble.",
        price: 21,
        discount: 2,
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 12,
        brandId: 4,
        categoryId: 3,
        name: "Clay & Charcoal Cleanser",
        description:
          "Creamy cleanser with kaolin, bamboo charcoal, and aloe to balance combination skin without stripping.",
        exploreInfo: "Sulphate-free and fragrance-free; packaged in a sugarcane tube you can recycle curbside.",
        price: 14.5,
        discount: 0,
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 13,
        brandId: 4,
        categoryId: 3,
        name: "Herbal Shampoo Bar",
        description:
          "Solid shampoo with nettle, rosemary, and gentle coconut-derived surfactants to clarify without drying.",
        exploreInfo:
          "One bar equals two bottles of liquid shampoo; shipped in paper wrap and safe for carry-on travel.",
        price: 9.2,
        discount: 0,
        stock: 44,
        imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 14,
        brandId: 4,
        categoryId: 3,
        name: "Mineral Sunscreen SPF 30",
        description:
          "Zinc oxide sunscreen with non-nano minerals and reef-safe formulation for everyday outdoor use.",
        exploreInfo:
          "Works under makeup without white cast; aluminum tube is fully recyclable with household metal.",
        price: 18.7,
        discount: 1.2,
        stock: 28,
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 15,
        brandId: 5,
        categoryId: 3,
        name: "Bamboo Toothbrush Kit",
        description:
          "Set of four bamboo toothbrushes with castor oil bristles and minimalist handles for the whole household.",
        exploreInfo:
          "Numbered handles make family use simple; kraft box is compostable and easy to store.",
        price: 7.8,
        discount: 0,
        stock: 70,
        imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 16,
        brandId: 5,
        categoryId: 4,
        name: "Stainless Lunch Box",
        description:
          "Leak-resistant double-wall lunch box with removable divider and rounded edges for easy cleaning.",
        exploreInfo: "Perfect for office or trail; stainless steel keeps flavours neutral and lasts for years.",
        price: 24,
        discount: 2,
        stock: 22,
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 17,
        brandId: 5,
        categoryId: 4,
        name: "Glass Pantry Jar Set",
        description:
          "Three airtight borosilicate jars with bamboo lids and silicone seals to keep dry goods fresh longer.",
        exploreInfo: "Ideal for bulk pantry storage; lids are replaceable to extend life and reduce waste.",
        price: 19.5,
        discount: 0,
        stock: 31,
        imageUrl: "https://images.unsplash.com/photo-1528838062335-aa0e2a728932?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 18,
        brandId: 5,
        categoryId: 4,
        name: "Organic Cotton Produce Bags (set of 8)",
        description:
          "Breathable mesh and solid cotton bags sized for bread, greens, and bulk shopping trips.",
        exploreInfo:
          "Machine washable and built to last; tuck into your backpack to skip single-use produce bags.",
        price: 12.1,
        discount: 0,
        stock: 55,
        imageUrl: "https://images.unsplash.com/photo-1498550744921-75f79806b8a7?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 19,
        brandId: 3,
        categoryId: 4,
        name: "Reusable Coffee Cup",
        description:
          "Double-wall glass cup with cork sleeve and leak-proof lid to keep drinks warm without plastic taste.",
        exploreInfo: "Barista size fits most cafe machines; lid is replaceable and dishwasher safe.",
        price: 15,
        discount: 1,
        stock: 48,
        imageUrl: "https://images.unsplash.com/photo-1510626176961-4b37d0b4e904?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 20,
        brandId: 2,
        categoryId: 4,
        name: "Beeswax Wrap Trio",
        description:
          "Set of three beeswax wraps made with organic cotton, tree resin, and jojoba oil to seal leftovers.",
        exploreInfo:
          "Softens with the warmth of your hands and resets in cool air; replaces plastic wrap for snacks and sandwiches.",
        price: 10.4,
        discount: 0,
        stock: 64,
        imageUrl: "https://images.unsplash.com/photo-1513863323963-1de60683efad?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 21,
        brandId: 6,
        categoryId: 5,
        name: "Organic Cotton T-Shirt",
        description:
          "Midweight jersey tee with GOTS-certified cotton, a relaxed unisex fit, and taped seams for durability.",
        exploreInfo: "Pre-shrunk and garment dyed with low-impact colour; recycled paper tags only.",
        price: 28,
        discount: 0,
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 22,
        brandId: 6,
        categoryId: 5,
        name: "Recycled Fiber Hoodie",
        description:
          "Fleece hoodie knit from recycled cotton and PET bottles with brushed interior for warmth.",
        exploreInfo:
          "Raglan sleeves and oversized pocket for comfort; shipped in a compostable mailer with no plastic.",
        price: 54,
        discount: 5,
        stock: 18,
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 23,
        brandId: 6,
        categoryId: 5,
        name: "Hemp Weekend Tote",
        description:
          "Roomy tote made from hemp canvas with reinforced straps and a flat bottom so it stands while loading.",
        exploreInfo: "Fits a laptop and groceries; interior pocket keeps keys and phone easy to reach.",
        price: 39,
        discount: 0,
        stock: 26,
        imageUrl: "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 24,
        brandId: 2,
        categoryId: 5,
        name: "Merino Wool Socks",
        description:
          "Temperature-regulating merino socks with durable heel and toe reinforcement and a soft ankle cuff.",
        exploreInfo:
          "Naturally odour-resistant and breathable; knit in small batches in the EU with traceable wool.",
        price: 14,
        discount: 0,
        stock: 36,
        imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 25,
        brandId: 6,
        categoryId: 5,
        name: "Upcycled Denim Jacket",
        description:
          "Vintage denim reworked with new buttons and plant-based dye for a refreshed and unique jacket.",
        exploreInfo:
          "One-of-a-kind wash on every piece; repair program included for 12 months after purchase.",
        price: 89,
        discount: 7,
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1503342452485-86b7f54527b1?auto=format&fit=crop&w=900&q=80",
      },
    ],
  });

  await prisma.user.upsert({
    where: { email: "eko@example.com" },
    update: {},
    create: {
      email: "eko@example.com",
      firstName: "Eko",
      password: await bcrypt.hash("Password123!", 10),
      phone: "+48111222333",
      country: "Poland",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
