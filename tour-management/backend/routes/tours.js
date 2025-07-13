import express from 'express';
import {
    getSingleTour,
    getTourCount,
    createTour,
    updateTour,
    deleteTour,
    getAllTour,
    getTourBySearch,
    getFeaturedTour
} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// More specific routes should come before parameterized ones like '/:id'

// Search and featured routes
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTours', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);

// All tours (with pagination)
router.get('/', getAllTour);

// Create, update, delete, get single
router.post('/', verifyAdmin, createTour);
router.put('/:id', verifyAdmin,updateTour);
router.delete('/:id', verifyAdmin,deleteTour);
router.get('/:id', getSingleTour); // Put this at the bottom to avoid conflict

export default router;
