// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");

// router.post("/send", async (req, res) => {
//   try {
//     console.log(req)
//     const { to, subject, text } = req.body;

//     if (!to || !subject || !text) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     });

//     res.json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Email sending failed", error });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { sendInvoiceEmail } = require("../controller/emailController");

router.post("/send", sendInvoiceEmail);

module.exports = router;
