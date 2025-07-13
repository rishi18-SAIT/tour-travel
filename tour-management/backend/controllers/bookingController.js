// backend/controllers/bookingController.js

import Booking from '../models/Booking.js';
import sendEmail from '../utils/sendEmail.js';
import PDFDocument from 'pdfkit'; 
import fs from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path and directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Booking + Send Email + Generate Invoice
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    // Ensure the invoices directory exists
    const invoicesDirectory = path.join(__dirname, '../invoices');
    if (!fs.existsSync(invoicesDirectory)) {
      fs.mkdirSync(invoicesDirectory, { recursive: true });
      console.log('Invoices directory created!');
    } else {
      console.log('Invoices directory already exists!');
    }

    // Generate Invoice PDF
    const filePath = path.join(invoicesDirectory, `bill-${savedBooking._id}.pdf`);
    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(filePath);

    pdfStream.on('finish', async () => {
      console.log('PDF generated and saved:', filePath);

      // Prepare HTML content for email
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f4f4f9; border-radius: 10px;">
          <div style="text-align: center; background-color: #4CAF50; color: white; padding: 20px; border-radius: 8px;">
            <h2>🌟 Booking Confirmed!</h2>
            <p style="font-size: 18px;">Your adventure awaits!</p>
          </div>
          
          <div style="margin-top: 20px; background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
            <p>Hello <strong>${savedBooking.fullName}</strong>,</p>
            <p>We are thrilled to confirm your booking for <strong>${savedBooking.tourName}</strong>!</p>
            <p>Your tour is scheduled for <strong>${savedBooking.bookAt.toDateString()}</strong>.</p>
            <p style="font-size: 18px; color: #555;">Thank you for choosing us for your upcoming adventure to <strong>${savedBooking.tourName}</strong>. We can't wait to have you with us and create unforgettable memories together!</p>
            <br/>
            <p style="font-size: 16px; color: #555;">Feel free to reach out if you have any questions or need further assistance. We're here to help!</p>
            <br/>
            <div style="text-align: center; margin-top: 20px;">
              <p><em>Regards,</em></p>
              <p><strong>Tours Booking Team</strong></p>
              <p style="color: #888;">Follow us for updates and exclusive offers!</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://www.yourwebsite.com" style="padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
          </div>
        </div>
      `;

      try {
        await sendEmail(
          savedBooking.userEmail,
          'Your Tour Booking Confirmation 🎉',
          `Hello ${savedBooking.fullName}, your booking is confirmed.`,
          htmlContent,
          [{
            filename: `bill-${savedBooking._id}.pdf`,
            path: filePath,
            contentType: 'application/pdf'
          }]
        );

        console.log('Email sent successfully!');

        // Optional: Delete invoice file after sending
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting invoice file:', err);
          } else {
            console.log('Invoice file deleted after email sent.');
          }
        });

        res.status(200).json({
          success: true,
          message: 'Booking created successfully, invoice generated, and confirmation email sent!',
          data: savedBooking,
        });

      } catch (emailError) {
        console.error('Error sending email:', emailError.message);
        res.status(500).json({
          success: false,
          message: 'Error sending confirmation email.',
          error: emailError.message,
        });
      }
    });

   // --- Write PDF content (Beautifully Formatted Invoice) ✨ ---
doc.pipe(pdfStream);

// Title Section (Bold Header with Background)
doc.rect(0, 0, doc.page.width, 100)
  .fill('#0066cc'); // Deep blue background for title

doc
  .fillColor('white')
  .fontSize(36)
  .font('Helvetica-Bold') // Bold font for title
  .text('Booking Invoice', 50, 30, { align: 'center' }); // Large centered title

doc.moveDown(2); // Move down for spacing

// Customer Info Section (Modern Design with Soft Background)
doc
  .fillColor('#333') // Darker text color for readability
  .fontSize(18)
  .text('Customer Information', { underline: true, align: 'left' }); // Underlined heading

doc.moveDown(0.5);
doc.fontSize(14)
  .text(`Name: ${savedBooking.fullName}`, { lineGap: 10 }) // Spacing between lines
  .text(`Email: ${savedBooking.userEmail}`);

// Add subtle background shading to make it visually appealing
doc.rect(50, doc.y + 10, doc.page.width - 100, 50) // Background box for customer info
  .fill('#f0f0f0'); // Light gray background

doc.moveDown(1);

// Divider Line (Subtle light gray line for separation)
doc.moveTo(50, doc.y)
  .lineTo(doc.page.width - 50, doc.y)
  .strokeColor('#dddddd')
  .lineWidth(1)
  .stroke();

doc.moveDown(1);

// Booking Details Section (Well-structured with Better Spacing)
doc
  .fillColor('#333')
  .fontSize(18)
  .text('Booking Details', { underline: true, align: 'left' });

doc.moveDown(0.5);
doc.fontSize(14)
  .text(`Tour: ${savedBooking.tourName}`)
  .text(`Date: ${savedBooking.bookAt.toDateString()}`)
  .text(`Booking ID: ${savedBooking._id}`)
  .text(`Total Price: $${savedBooking.totalPrice}`, { bold: true, fontSize: 16 });

doc.moveDown(1);

// Elegant Thank You Section (Centered and Stylish)
doc.fontSize(18)
  .fillColor('#0066cc') // Blue text for the thank you note
  .text('Thank you for booking your adventure with us!', { align: 'center' });

doc.moveDown(0.5);
doc.fontSize(14)
  .fillColor('#333')
  .text('- Tours Booking Team', { align: 'center' });

// Final Divider Line (Soft gray border for a clean finish)
doc.moveTo(50, doc.y)
  .lineTo(doc.page.width - 50, doc.y)
  .strokeColor('#dddddd')
  .lineWidth(1)
  .stroke();

// Add Footer (Call-to-Action)
doc.moveDown(1);
doc.fontSize(12)
  .fillColor('#333')
  .text('For inquiries or support, please contact us at support@toursbooking.com', { align: 'center' });

doc.end(); // Finalize the PDF file



  } catch (err) {
    console.error('Error creating booking:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get Single Booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Booking fetched successfully!',
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: err.message,
    });
  }
};

// Get All Bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: 'All bookings fetched successfully!',
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};
