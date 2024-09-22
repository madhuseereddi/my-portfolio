require('dotenv').config();
const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const dbPath = process.env.DATABASE_FILE;

const DbServer = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server connected at: http://localhost:${process.env.PORT}`);
    });

    // Create table if it doesn't exist
    await db.run(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT)`);
  } catch (e) {
    console.log(`Error occurred: ${e.message}`);
  }
};

DbServer();

app.post('/contact', async (req, res) => {
  const { message } = req.body;

  // Insert message into the database
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  await db.run(`INSERT INTO messages (content) VALUES (?)`, [message]);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // List of recipients
  const recipients = [
    'harishvemula76@gmail.com'
  ];

  // Send email to each recipient individually
  const emailPromises = recipients.map(recipient => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient, // Send to each recipient individually
      subject: 'New Contact Form Submission',
      text: message,
    };

    return transporter.sendMail(mailOptions);
  });

  // Wait for all emails to be sent
  Promise.all(emailPromises)
    .then(() => {
      res.status(200).send('Message received and emails sent to all recipients');
    })
    .catch(error => {
      console.error('Error sending emails:', error);
      res.status(500).send('Error sending emails');
    });
});
