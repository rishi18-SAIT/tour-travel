import Tour from '../models/tours.js';

// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    try {
       const savedTour = await newTour.save();
       

        res
        .status(200)
        .json({
            success: true,
            message: 'Successfully created',
            data: savedTour,
        });
    } catch (err) {
        res
        .status(500)
        .json({
            success: false,
            message: 'Failed to create. Try again',
            
        });
    }
};

// Get all tours with reviews populated
export const getAllTour = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);
        
        res.status(200).json({
            success: true,
            count:tours.length,
            message: 'Fetched tours successfully',
            data: tours
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tours',
            
        });
    }
};

// Update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }

        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update tour',
            error: err.message
        });
    }
};

// Delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }

        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Successfully deleted'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete tour',
            error: err.message
        });
    }
};

// Get single tour by ID
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id)
        .populate("reviews");
        
        res.status(200).json({
            success: true,
            message: 'Fetched tour successfully',
            data: tour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour',
            error: err.message
        });
    }
};



// Get tours by search filters
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city , 'i');
    const distance = parseInt(req.query.distance) ;
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        }).populate("reviews");

        res.status(200).json({
            success: true,
            message: 'Tours fetched successfully',
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to search tours',
            
        });
    }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true })
        
        .limit(8);
        res.status(200).json({
            success: true,
            message: 'Featured tours fetched successfully',
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch featured tours',
           
        });
    }
};

// Get total tour count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: 'Tour count fetched successfully',
            data: tourCount
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour count',
           
        });
    }
};
