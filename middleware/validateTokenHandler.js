const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized user detected!" });
            }

            // Add the decoded user information to the request object
            req.user = decoded.user;

            // Pass control to the next middleware or route handler
            next();
        });
    } else {
        return res.status(401).json({ message: "No token provided or incorrect format!" });
    }
});

module.exports = validateToken;
