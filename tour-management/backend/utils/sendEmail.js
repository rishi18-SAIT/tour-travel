import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments, // <- directly using attachments array
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to', to);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
