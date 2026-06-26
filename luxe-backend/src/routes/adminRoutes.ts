import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get Dashboard Analytics
router.get('/dashboard', async (req, res) => {
  try {
    // Total Sales (All delivered/shipped orders)
    const orders = await prisma.order.findMany();
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    // Active Orders (Processing)
    const activeOrders = orders.filter(o => o.status === 'PROCESSING').length;

    // Unique Customers
    const uniqueCustomers = new Set(orders.map(o => o.email)).size;

    // Total Products
    const totalProducts = await prisma.product.count();

    // Recent Orders
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    res.json({
      success: true,
      data: {
        totalSales,
        activeOrders,
        customers: uniqueCustomers,
        products: totalProducts,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

export default router;
