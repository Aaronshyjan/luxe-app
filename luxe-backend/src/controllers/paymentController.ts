import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { razorpay, verifyPaymentSignature } from '../services/razorpay';
import { sendOrderConfirmationEmail } from '../services/emailService';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while creating payment order' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_db_id } = req.body;

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isValid) {
      // Create payment record in DB
      await prisma.payment.create({
        data: {
          transactionId: razorpay_payment_id,
          amount: 0, // Should be fetched or passed properly
          status: 'SUCCESS',
          method: 'RAZORPAY',
        }
      });
      
      if (order_db_id) {
         const updatedOrder = await prisma.order.update({
             where: { id: order_db_id },
             data: { status: 'PACKED', payment_id: razorpay_payment_id }
         });

         // Send email using the updated order details
         try {
           await sendOrderConfirmationEmail(updatedOrder.email, {
             id: updatedOrder.order_number,
             status: updatedOrder.status,
             amount: updatedOrder.total,
             items: "Your awesome Luxe items!"
           });
         } catch (emailError) {
           console.error("Failed to send email but payment succeeded:", emailError);
         }
      }

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while verifying payment' });
  }
};
