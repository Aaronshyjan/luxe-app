import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});

  console.log('Seeding categories...');
  const categoriesToCreate = ['Tech', 'Fashion', 'Home', 'Accessories', 'Watches', 'Audio'];
  const createdCategories: any = {};
  
  for (const catName of categoriesToCreate) {
    createdCategories[catName] = await prisma.category.create({
      data: { name: catName }
    });
  }

  console.log('Seeding products...');
  const products = [
    // --- TECH ---
    { name: 'Ultra-Wide Gaming Monitor', price: 45000, originalPrice: 50000, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', discount: '10% OFF', category: 'Tech' },
    { name: 'Mechanical Gaming Keyboard', price: 12000, originalPrice: null, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Wireless Gaming Mouse', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?w=800&q=80', discount: null, category: 'Tech' },
    { name: '4K Streaming Webcam', price: 15000, originalPrice: 18000, image: 'https://images.unsplash.com/photo-1626244569502-86927a3be074?w=800&q=80', discount: 'Sale', category: 'Tech' },
    { name: 'Portable SSD 1TB', price: 11000, originalPrice: null, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Smart Home Assistant', price: 6500, originalPrice: null, image: 'https://images.unsplash.com/photo-1568910748155-01ca989ddda6?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Tablet Pro 11-inch', price: 75000, originalPrice: 80000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', discount: 'Sale', category: 'Tech' },
    { name: 'VR Headset Kit', price: 35000, originalPrice: null, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Smart Desk Lamp', price: 4500, originalPrice: null, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f7821?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Smartphone Gimbal', price: 9500, originalPrice: 12000, image: 'https://images.unsplash.com/photo-1587824967357-193309a47a19?w=800&q=80', discount: '15% OFF', category: 'Tech' },

    // --- FASHION ---
    { name: 'Cashmere Turtleneck', price: 18500, originalPrice: null, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Italian Leather Jacket', price: 45000, originalPrice: 55000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', discount: 'Sale', category: 'Fashion' },
    { name: 'Silk Evening Dress', price: 32000, originalPrice: null, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Classic Trench Coat', price: 28000, originalPrice: 32000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', discount: 'Sale', category: 'Fashion' },
    { name: 'Tailored Wool Suit', price: 65000, originalPrice: null, image: 'https://images.unsplash.com/photo-1594938298596-ec65b8d234a9?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Designer Denim Jeans', price: 12500, originalPrice: null, image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Cotton Oxford Shirt', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Pleated Midi Skirt', price: 9500, originalPrice: null, image: 'https://images.unsplash.com/photo-1583496661160-c588c4af377c?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Cashmere Beanie', price: 4500, originalPrice: null, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Leather Chelsea Boots', price: 21000, originalPrice: 24000, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80', discount: 'Sale', category: 'Fashion' },

    // --- HOME ---
    { name: 'Modern Lounge Sofa', price: 85000, originalPrice: 95000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', discount: '10% OFF', category: 'Home' },
    { name: 'Handcrafted Ceramic Vase', price: 3400, originalPrice: null, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Marble Coffee Table', price: 45000, originalPrice: null, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Pendant Light Fixture', price: 12500, originalPrice: 15000, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?w=800&q=80', discount: 'Sale', category: 'Home' },
    { name: 'Minimalist Bookshelf', price: 22000, originalPrice: null, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Linen Bedding Set', price: 15000, originalPrice: null, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Abstract Wall Art', price: 18500, originalPrice: null, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Velvet Armchair', price: 35000, originalPrice: 40000, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', discount: 'Sale', category: 'Home' },
    { name: 'Handwoven Persian Rug', price: 55000, originalPrice: null, image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80', discount: null, category: 'Home' },
    { name: 'Geometric Table Planter', price: 2500, originalPrice: null, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80', discount: null, category: 'Home' },

    // --- ACCESSORIES ---
    { name: 'Leather Card Holder', price: 3200, originalPrice: null, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Minimalist Key Organizer', price: 1800, originalPrice: 2200, image: 'https://images.unsplash.com/photo-1581451512403-ce6a6ff8bf39?w=800&q=80', discount: 'Sale', category: 'Accessories' },
    { name: 'Polarized Aviator Sunglasses', price: 15600, originalPrice: 18200, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', discount: 'Sale', category: 'Accessories' },
    { name: 'Canvas Backpack', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Silk Pocket Square', price: 4500, originalPrice: null, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Gold Chain Necklace', price: 25000, originalPrice: null, image: 'https://images.unsplash.com/photo-1599643478514-4a42041b65ce?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Leather Crossbody Bag', price: 18500, originalPrice: null, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Woven Leather Belt', price: 6500, originalPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Silver Cufflinks', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Travel Duffle Bag', price: 22000, originalPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', discount: null, category: 'Accessories' },

    // --- WATCHES ---
    { name: 'Classic Chronograph', price: 45000, originalPrice: 50000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', discount: '10% OFF', category: 'Watches' },
    { name: 'Minimalist Smartwatch', price: 24900, originalPrice: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Luxury Diver Watch', price: 125000, originalPrice: null, image: 'https://images.unsplash.com/photo-1548171915-e763a8a37f5b?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Rose Gold Dress Watch', price: 55000, originalPrice: null, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Sport Activity Watch', price: 18500, originalPrice: null, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Titanium Pilot Watch', price: 85000, originalPrice: 90000, image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80', discount: 'Sale', category: 'Watches' },
    { name: 'Vintage Leather Watch', price: 32000, originalPrice: null, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Skeleton Automatic Watch', price: 95000, originalPrice: null, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Slim Quartz Watch', price: 15000, originalPrice: null, image: 'https://images.unsplash.com/photo-1614164185128-f4cb0ce71482?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Gold Plated Chrono', price: 65000, originalPrice: 75000, image: 'https://images.unsplash.com/photo-1594532452445-5381d6f44ec7?w=800&q=80', discount: 'Sale', category: 'Watches' },

    // --- AUDIO ---
    { name: 'Premium Noise-Cancelling Headphones', price: 28999, originalPrice: 32999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', discount: '15% OFF', category: 'Audio' },
    { name: 'Wireless Earbuds Pro', price: 18999, originalPrice: 21000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', discount: 'Sale', category: 'Audio' },
    { name: 'Studio Monitor Speakers', price: 45000, originalPrice: null, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Portable Bluetooth Speaker', price: 12500, originalPrice: null, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Hi-Fi Turntable', price: 35000, originalPrice: 40000, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', discount: 'Sale', category: 'Audio' },
    { name: 'Over-Ear DJ Headphones', price: 22000, originalPrice: null, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Soundbar System', price: 28000, originalPrice: null, image: 'https://images.unsplash.com/photo-1544427920-c49ccdaf8c48?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Wired In-Ear Monitors', price: 15000, originalPrice: null, image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Smart Audio Glasses', price: 19500, originalPrice: null, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', discount: null, category: 'Audio' },
    { name: 'Retro Cassette Player', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1516088926487-b67e0e84b726?w=800&q=80', discount: null, category: 'Audio' }
  ];

  for (const p of products) {
    const category = createdCategories[p.category];
    if (category) {
      await prisma.product.create({
        data: {
          name: p.name,
          description: `Experience the premium quality of our ${p.name}.`,
          price: p.price,
          discount_price: p.originalPrice || null,
          stock: 100,
          categoryId: category.id,
          rating: 4.5 + Math.random() * 0.5,
          images: [p.image],
        }
      });
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
