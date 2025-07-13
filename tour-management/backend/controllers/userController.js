import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
           
        });
    }
};

// Get all users (non-paginated)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Fetched users successfully',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: err.message
        });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            
        });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            
        });
    }
};

// Get single user by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Fetched user successfully',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: err.message
        });
    }
};

// Optional: Paginated users (can add query params like ?page=1&limit=8)
export const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 8;

    try {
        const users = await User.find({})
            .skip(page * limit)
            .limit(limit);
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            count: users.length,
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: err.message
        });
    }
};
