

const transporter = require("../config/mailConfig");

exports.sendInvoiceEmail = async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !html) {
      return res.status(400).json({ message: "Missing email fields" });
    }

    await transporter.sendMail({
      from: "no-reply@yourdomain.com",
      to,
      subject,
      html,       
    });

    res.json({ message: "Invoice emailed successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send invoice email" });
  }
};




