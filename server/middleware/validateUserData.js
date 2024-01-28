import User from "../models/User.js";


export const validateUserRegistrationData = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({error: "All fields are required!"})
    }

    if (password.length < 6) {
        return res.status(400).json({error: 'Password must be atleast 6 characters!'})
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(401).json({error: 'Email already exists!'})
    }


    next();
    
}

export const validateUserLoginData = async (req, res, next, error) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields required!' });
    }

    next();
}