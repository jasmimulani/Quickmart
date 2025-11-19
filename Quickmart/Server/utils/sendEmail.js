import nodemailer from "nodemailer";

/**
 * Generic email sender function
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} htmlMessage - Email body (HTML format)
 */
const sendEmail = async (to, subject, htmlMessage) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "YOUR_GMAIL_HERE",
        pass: process.env.EMAIL_PASS || "YOUR_GMAIL_APP_PASSWORD_HERE",
      },
    });

    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || "YOUR_GMAIL_HERE";

    await transporter.sendMail({
      from: `"QuickMart" <${fromAddress}>`,
      to,
      subject,
      html: htmlMessage,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.log("Email sending error:", error.message);
  }
};

export default sendEmail;
