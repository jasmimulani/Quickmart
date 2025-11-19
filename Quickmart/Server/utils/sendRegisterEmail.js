import nodemailer from "nodemailer";

const sendRegisterEmail = async (name, email) => {
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
      to: email,
      subject: "Welcome to QuickMart – Your Account is Ready!",
      html: `
        <h2>Welcome to QuickMart, ${name}!</h2>
        <p>Thank you for registering with QuickMart.</p>
        <p>Your account has been successfully created and is ready to use.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse and purchase from our wide range of products</li>
          <li>Track your orders in real-time</li>
          <li>Save your favorite items</li>
          <li>Enjoy fast and secure checkout</li>
        </ul>
        <hr/>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p><strong>Happy Shopping!</strong></p>
        <p><b>– Team QuickMart</b></p>
      `,
    });

    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.log("Registration Email Error:", error.message);
  }
};

export default sendRegisterEmail;
