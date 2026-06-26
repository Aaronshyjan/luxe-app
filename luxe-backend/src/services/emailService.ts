import nodemailer from 'nodemailer';

// Create a reusable transporter using SMTP
// For production, use SendGrid, Mailgun, or Google Workspace SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, // Your app password
  },
});

export const sendOrderConfirmationEmail = async (toEmail: string, orderDetails: any) => {
  try {
    const info = await transporter.sendMail({
      from: `"LUXE Support" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Order Confirmation ${orderDetails.id} - LUXE`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1F108E;">Thank you for your order!</h2>
          <p>Hi there,</p>
          <p>We're getting your order ready to be shipped. We will notify you when it has been sent.</p>
          
          <div style="background-color: #F9F9FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Summary (${orderDetails.id})</h3>
            <p><strong>Status:</strong> ${orderDetails.status}</p>
            <p><strong>Total Amount:</strong> ₹${orderDetails.amount}</p>
            <p><strong>Items:</strong> ${orderDetails.items}</p>
          </div>
          
          <p>If you have any questions, reply to this email or contact us at support@luxestore.com.</p>
          <br/>
          <p>Best regards,<br/>The LUXE Team</p>
        </div>
      `,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send order confirmation email');
  }
};
