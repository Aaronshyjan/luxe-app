import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Razorpay from 'razorpay';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';
const router = Router();
const prisma = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
  key_secret: process.env.RAZORPAY_SECRET || 'test_secret'
});

// Create Order (Guest or Logged in)
router.post('/', async (req, res) => {
  try {
    const { customer_name, phone, email, address, items, payment_method } = req.body;

    // Calculate total from DB to prevent client spoofing
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) return res.status(400).json({ success: false, message: `Product ${item.productId} not found` });
      
      const price = product.discount_price || product.price;
      total += price * item.quantity;
      
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: price
      });
    }

    // Add shipping & tax
    const shipping = 15;
    const tax = total * 0.08;
    const finalTotal = total + shipping + tax;

    // Generate Order Number
    const order_number = `LX-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
      data: {
        order_number,
        customer_name,
        phone,
        email,
        address,
        total: finalTotal,
        payment_method,
        status: 'PROCESSING',
        items: {
          create: orderItems
        }
      },
      include: { items: true }
    });

    // If Razorpay, generate order ID
    let razorpayOrderId = null;
    if (payment_method === 'razorpay') {
      const options = {
        amount: Math.round(finalTotal * 100), // amount in smallest currency unit (paise)
        currency: "USD",
        receipt: order_number
      };
      const rzOrder = await razorpay.orders.create(options);
      razorpayOrderId = rzOrder.id;
      
      // Update order with payment ID
      await prisma.order.update({
        where: { id: order.id },
        data: { payment_id: razorpayOrderId }
      });
    }

    res.json({ success: true, data: { order, razorpayOrderId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
});

// Get Order by tracking ID
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { order_number: req.params.id },
      include: { items: { include: { product: true } } }
    });

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get all orders (For admin, should be protected)
router.get('/admin/all', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
