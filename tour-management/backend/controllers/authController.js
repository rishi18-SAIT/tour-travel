import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//user registration
export const register = async(req,res) => {
    try{

        //hashing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)


       const newUser = new User ({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        photo:req.body.photo,
       })



       await newUser.save()

       res.status(200).json({success:true, message:"Successfully created"})
    } catch(err) {
        res.status(500).json({success:false, message:"Failed to create. Try again"})
    }
};

//user login
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      // If user doesn't exist
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // if user is exist then check the password or compare the password
      const checkCorrectPassword = await bcrypt.compare(
        req.body.password, user.password);

        //if password is incorrect
  
      if (!checkCorrectPassword) {
        return res
        .status(401)
        .json({ success: false, message: 'Incorrect email or password' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );
  
      const { password: userPassword, role, ...rest } = user._doc;
  
      // Set token in HTTP-only cookie
      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
        sameSite: 'Strict'
      });
  
      res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        token, // Optional: send token to client too
        data: { ...rest }, 
        role,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to login' });
    }
  };