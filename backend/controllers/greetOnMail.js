import nodemailer from "nodemailer";

const greetOnMail = async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: ` Welcome to Our Platform!`,
    html: `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Arial, sans-serif; padding: 20px; background: #ff2424;">
      <div style="background: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto;">
        
        <h2 style="color: #333;">Welcome, ${name}! </h2>
        <p style="color: #555;">Thanks for signing up on our platform. We're excited to have you!</p>
        <p style="color: #555;">If you need any help, feel free to reach out.</p>
        <p style="color: #555;">Cheers,<br/>The Bands Team </p>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 12px;">You received this email because you registered on our site.</p>
    </body>
    </html>
  `,
  };
  console.log(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Email sent!" });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default greetOnMail;
