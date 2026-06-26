import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get Wishlist for a Guest
router.get('/:guestId', async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: req.params.guestId },
      include: { items: { include: { product: true } } }
    });

    if (!wishlist) {
      return res.json({ success: true, data: { items: [] } });
    }

    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Add to Wishlist
router.post('/add', async (req, res) => {
  try {
    const { guestId, productId } = req.body;

    let wishlist = await prisma.wishlist.findUnique({ where: { userId: guestId } });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: guestId }
      });
    }

    // Check if already exists
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId
        }
      }
    });

    if (existing) {
      return res.json({ success: true, message: 'Already in wishlist' });
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId
      }
    });

    res.json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Remove from Wishlist
router.post('/remove', async (req, res) => {
  try {
    const { guestId, productId } = req.body;
    
    const wishlist = await prisma.wishlist.findUnique({ where: { userId: guestId } });
    if (!wishlist) return res.json({ success: true });

    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId
        }
      }
    });

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
