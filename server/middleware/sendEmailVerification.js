import nodemailer from "nodemailer";

/**
 * ! Email verification
 */

const sendEmailVerification = async (email, verificationToken)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_NODEMAILER_EMAIL,
            pass: process.env.GOOGLE_NODEMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: 'homeMart',
        to: email,
        subject: 'Email Verification',
        text: `
        Verify your email:http://localhost:${process.env.PORT}/api/auth/verify/${verificationToken}
        `
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}


/**
 * ? Password reset
 */

const sendResetToken = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_NODEMAILER_EMAIL,
            pass: process.env.GOOGLE_NODEMAILER_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: 'homeMart',
            to: email,
            subject: 'Reset Password Token!',
            text: resetToken
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    sendEmailVerification,
    sendResetToken
}