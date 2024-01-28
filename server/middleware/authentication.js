import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** Authenticate User Token */

const requireAuthToken = async (req, res, next) => {
    const { authToken } = req.cookies;

    /** checking if token exists and is verified */
    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, async(err, decodedToken) => {
            if (err) return res.status(400).json({ message: 'Invalid user token' });

            console.log(decodedToken);
            next();
        })
    } else {
        return res.status(401).json({message: 'You are not authenticated for this action!'})
    }
}

const checkUser = async (req, res, next) => {
    const { authToken } = req.cookies;

    /** check user and verify user */
    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                return res.status(401).json({ message: 'Invalid User token!' });
            }

            console.log(decodedToken);
            const user = await User.findById(decodedToken.id);

            if (!user) return res.status(400).json({ message: 'You cannot access this resoure!' });

            res.locals.user = user;
            next();
        })
    } else {
        return res.status(500).json({message: 'You are not authorized to use this resource!'})
    }
}

const checkAdmin = async (req, res, next) => {
    const { authToken } = req.cookies;

    /** check if user has admin access */
    if (authToken) {
        jwt.verify(authToken, process.env.AUTH_SECRET, {}, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                return res.status(401).json({ message: 'Invalid User token!' });
            }

            const user = await User.findById(decodedToken.id);
            if (!user) return res.status(400).json({ message: 'You do not have access to this resource!' });

            if (user.Admin) {
                res.locals.user = user;
                console.log(decodedToken);
                next();
            } else {
                return res.status(401).json({message: 'This resource requires Admin rights!'})
            }
            
        })
    } else {
        return res.status(500).json({message: 'You are not authorized to use this resource!'})
    }
}


export {
    requireAuthToken, 
    checkUser,
    checkAdmin
}