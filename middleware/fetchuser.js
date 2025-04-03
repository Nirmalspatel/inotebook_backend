var jwt = require('jsonwebtoken');
const JWT_SECRET = "nirmal";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); 
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // Verify the token using the secret
        if (!data) {
            console.log("JWT verification failed");
            return res.status(401).send({ error: "Invalid token" });
        }

        console.log("Decoded data:", data); // Debugging to confirm data is extracted
        req.user = data.user; // Attach the user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Log error details
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
