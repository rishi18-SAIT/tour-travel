import jwt from 'jsonwebtoken';

// Token verification middleware
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Token is invalid" });
        }

        req.user = user;  // Save user info in the request object
        next(); // Proceed to the next middleware/route handler
    });
};

// Middleware to verify user (self or admin)
export const verifyUser = (req, res, next) => {
    // The 'verifyToken' middleware needs to be called directly here, not as a callback.
    verifyToken(req, res, () => {
        // Check if the user is either accessing their own data or is an admin
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();  // Allow the request to proceed
        } else {
            return res.status(403).json({ success: false, message: "You're not authorized" });
        }
    });
};

// Middleware to verify admin
export const verifyAdmin = (req, res, next) => {
    // The 'verifyToken' middleware needs to be called directly here as well.
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();  // Allow the request to proceed
        } else {
            return res.status(403).json({ success: false, message: "You're not authorized" });
        }
    });
};
