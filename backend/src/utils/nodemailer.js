import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp-relay.gmail.com",
  port: 587, //port for tranfering mails
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

// sending mail
export const sendMail = async (to_mail, OTP) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL, // sender address
      to: to_mail, // list of receivers
      subject: `Forget Password OTP of ${to_mail}`, // Subject line
      text: `OTP for the mail ${to_mail} is ${OTP}`, // plain text body
    });
    console.log(info);
    return true;
  } catch (error) {
    return false;
  }
};
