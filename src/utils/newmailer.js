import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log(emailType);
    if ((emailType = "Verify")) {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotePasswordToken: hashedToken,
          forgotePasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "185bad1b02171c",
        pass: "f76a42e50226ff",
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject:
        emailType === "Verify" ? "Verify your email" : "Reset your password", // Subject line

      html: `<p>Click <a href="${process.env.DOMAIN}/api/users/${
        emailType === "Verify" ? "verifymail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "Verify" ? "verify your email" : "reset your password"
      } or copy and paste in your browser: <br> ${process.env.DOMAIN}/users/${
        emailType === "Verify" ? "verifymail" : "resetpassword"
      }?token=${hashedToken}</p>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
