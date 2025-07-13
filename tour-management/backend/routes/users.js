import express from 'express';
import { updateUser, deleteUser, getAllUsers, getSingleUser } from '../controllers/userController.js';

const router = express.Router();
import { verifyAdmin, verifyUser} from '../utils/verifyToken.js';

// Get single user
router.get('/:id',  verifyUser, getSingleUser);

// Update user
router.put('/:id', verifyUser,updateUser);

// Delete user
router.delete('/:id', verifyUser, deleteUser);

// Get all users
router.get('/',verifyAdmin, getAllUsers);

export default router;
