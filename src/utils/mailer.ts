import nodemailer from "nodemailer";
import ejs from "ejs";

export const mailer = async (req: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await ejs.renderFile(
    "../sendgrid-mail-service/src/views/mail.ejs",
    {
      user: req.body.fullName,
    },
    async (err: any, data: any) => {
      if (err) {
        return err;
      } else {
        const mailOptions = {
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: "Welcome to our Subscriber's Family!",
          html: data,
        };
        await transporter.sendMail(mailOptions);
      }
    }
  );
};
