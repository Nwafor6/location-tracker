const express = require('express');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
dotenv.config();



const transporter = nodemailer.createTransport({
    service: 'gmail', // Update with your email service provider
    auth: {
        user: process.env.username, // Update with your email address
        pass: process.env.pass, // Update with your email password
    },
});

const sentMail = async (to, subject, html)=>{
    await transporter.sendMail({
        from: process.env.username, // Update with your email address
        to: to,
        subject: subject,
        html: html,
    });
}

app.get('/', async(req, res) => {
    const apiAddress = req.originalUrl;
    const userIpAddress = req.ip || req.connection.remoteAddress;
    
    // console.log('Request:', req);
    // console.log('User IP Address:', userIpAddress);
    
    res.send(`API Address: ${apiAddress}<br>User IP Address: ${userIpAddress}`);
    await sentMail("obiora369@gmail.com", "User Location", `${userIpAddress}` )
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});