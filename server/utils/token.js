import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;


const createToken = async(id, email, name, admin) => {
    return jwt.sign({ id, email, name, admin }, process.env.AUTH_SECRET, {
        expiresIn: maxAge
    })
}


export {
    maxAge,
    createToken
}