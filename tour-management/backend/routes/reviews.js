import express from 'express';
import { createReview } from '../controllers/reviewController.js';
 // ✅ import here

const router = express.Router();

// Apply verifyUser to protect this route
router.post('/:tourId', createReview);  // Change route to use :tourId

export default router;
