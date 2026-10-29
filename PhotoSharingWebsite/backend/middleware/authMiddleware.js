
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Not authorized. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Not authorized. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // The login controller signs the token with an "id" field.
        req.user = {
            id: decoded.id || decoded._id,
            username: decoded.username,
            role: decoded.role
        };

        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id || decoded._id,
            username: decoded.username,
            role: decoded.role
        };
    } catch {
        // The feed is public, so an absent or expired session must not block it.
    }

    return next();
};

export default protect;
