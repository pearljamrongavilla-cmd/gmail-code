const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

let otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "OTP Code",
      text: `Your OTP is: ${otp}`
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
