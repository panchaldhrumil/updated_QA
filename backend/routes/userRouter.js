const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sql, poolPromise , config } = require('../db');
const crypto = require('crypto');


// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length === 0) return res.status(404).send("Email not found");

    await pool.request()
      .input("otp", sql.VarChar, otp)
      .input("otpExpiry", sql.DateTime, otpExpiry)
      .input("email", sql.VarChar, email)
      .query("UPDATE Users SET resetOTP = @otp, otpExpiry = @otpExpiry WHERE email = @email");

    // Use your sendEmail function here
    // await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.status(200).send("OTP sent to your email.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});


// Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    const user = result.recordset[0];
    if (!user || user.resetOTP !== otp || new Date(user.otpExpiry) < new Date()) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.request()
      .input("password", sql.VarChar, hashedPassword)
      .input("email", sql.VarChar, email)
      .query("UPDATE Users SET password = @password, resetOTP = NULL, otpExpiry = NULL WHERE email = @email");

    res.status(200).send("Password reset successful.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});





 // Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    // Check for empty fields
  if ( !email || !password) {
    return res.status(400).send("No fields should be empty");
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    const user = result.recordset[0];
    if (!user) return res.status(500).send("Email does not exist");

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ email }, "shhhhh");
      res.cookie("token", token);
      res.status(200).send("now you are logged in");
    } else {
      res.status(400).send("Incorrect password");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});


// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
    // Check for empty fields
  if (!name || !email || !password) {
    return res.status(400).send("No fields should be empty");
  }
  try {
    const pool = await poolPromise;
    const checkUser = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (checkUser.recordset.length > 0) {
      return res.status(500).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .query("INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)");

    const token = jwt.sign({ email }, "shhhhh");
    res.cookie("token", token);
    res.status(200).send("Registered");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});
 
 module.exports = router ;