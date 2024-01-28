import Order from "../models/Order.js";


/**
 * ! GET MOMO Token
 */
const getMoMoToken = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ? POST PAY VIA MOMO
 */
const payViaMomo = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}



export {
    getMoMoToken,
    payViaMomo
}