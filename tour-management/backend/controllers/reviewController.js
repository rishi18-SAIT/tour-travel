import Tour from '../models/tours.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
    const tourId = req.params.tourId; // Get tour ID from route parameter
    const newReview = new Review({...req.body})

    try {
        

        // Save the review
        const savedReview = await newReview.save();

        // Add the review to the corresponding tour's reviews array
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Review submitted successfully',
            data: savedReview
        });
    } catch (err) {
        console.error('Error submitting review:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to submit review'
        });
    }
};
