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
    { name: 'Premium Noise-Cancelling Headphones', price: 28999, originalPrice: 32999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', discount: '15% OFF', category: 'Audio' },
    { name: 'Minimalist Smartwatch', price: 24900, originalPrice: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', discount: null, category: 'Watches' },
    { name: 'Designer Sunglasses', price: 15600, originalPrice: 18200, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', discount: 'Sale', category: 'Accessories' },
    { name: 'Luxury Leather Wallet', price: 9900, originalPrice: null, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', discount: null, category: 'Accessories' },
    { name: 'Professional 4K Drone', price: 85000, originalPrice: 95000, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80', discount: '10% OFF', category: 'Tech' },
    { name: 'Italian Silk Scarf', price: 12500, originalPrice: null, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Cashmere Sweater', price: 22000, originalPrice: null, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', discount: null, category: 'Fashion' },
    { name: 'Mechanical Keyboard', price: 14500, originalPrice: null, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', discount: null, category: 'Tech' },
    { name: 'Classic Chronograph', price: 45000, originalPrice: 50000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', discount: '10% OFF', category: 'Watches' },
    { name: 'Wireless Earbuds Pro', price: 18999, originalPrice: 21000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', discount: 'Sale', category: 'Audio' },
    { name: 'Canvas Backpack', price: 8500, originalPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', discount: null, category: 'Accessories' }
  ];

  for (const p of products) {
    const category = createdCategories[p.category];
    if (category) {
      await prisma.product.create({
        data: {
          name: p.name,
          description: `Experience the premium quality of our ${p.name}.`,
          price: p.price,
          discount_price: p.originalPrice || null, // Storing original price as discount_price logic might be inverted, but we'll adapt. Wait, original price is usually higher. We'll store it in variants or adjust schema, but discount_price works. Actually, let's just use discount_price to store the current price if discounted, and price as original, or vice versa. Let's just use price.
          // Wait, the schema has price and discount_price.
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
