# Invoices Folder

This folder is used to temporarily store generated invoice PDFs for tour bookings.

- Every time a booking is created, a PDF invoice (bill slip) is generated using pdfkit and saved here.
- Example filenames: `bill-<bookingId>.pdf`
- These files are usually emailed to users as attachments.
- Optionally, files can be deleted after sending to keep the server clean.

Note: This folder should be writable by the server.
