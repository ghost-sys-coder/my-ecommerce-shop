import nodemailer from "nodemailer";

/**
 * ! Email verification
 */

const sendEmailVerification = async (email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/${verificationToken}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_NODEMAILER_EMAIL,
      pass: process.env.GOOGLE_NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: "shopLocker", 
    to: email,
    subject: "Email Verification",
    html: `
    <div style="margin: 0; padding: 10; box-sizing: border-box">
    <h1 style="font-weight: 300; font-size: 24; color: teal; text-align: center">Verify your email!</h1>
    <h2 style="font-weight: 400; color: teal; font-size: 18; text-align: center;">Welcome to ShopLocker</h2>
  <img alt="logo" style="width: 100%; height: 150px; border-radius: 10px; object-fit: cover" src="https://i.postimg.cc/Kvf9SkHk/shoplocker-half-image.png" />
    <p style="line-height: 1.5; text-align: center;">You just signed up for an account with <b style="font-size: 17; color: teal">shopLocker</b>, we need you to verify your email before you proceed to login! </p>
    <p style="text-align: center;">Please click the link below to verify your email!</p>
    <a style="color: black; font-weight: 900; text-align: center; display: block; font-size: 30px" target="_blank" href=${verificationUrl}>CLICK HERE!</a>
  </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

/**
 * ? Password reset
 */

const sendResetToken = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_NODEMAILER_EMAIL,
      pass: process.env.GOOGLE_NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "shopLocker",
      to: email,
      subject: "Reset Password Token!",
      text: resetToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendEmailVerification, sendResetToken };
