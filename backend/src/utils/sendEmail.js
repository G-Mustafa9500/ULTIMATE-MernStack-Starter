import nodemailer from 'nodemailer';

/**
 * sendEmail({ to, subject, html })
 * Uses SMTP config from .env (works with Gmail, Outlook, Brevo, Mailgun etc.)
 */
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from:    `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log(`📧 Email sent → ${to} | MessageId: ${info.messageId}`);
  return info;
};

export default sendEmail;
