import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { createBooking, getBooking, getAllBooking } from '../controllers/bookingController.js'; // ✅ Add this line

const router = express.Router();

// Protected route – user must be logged in
router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/', getAllBooking);

export default router;
