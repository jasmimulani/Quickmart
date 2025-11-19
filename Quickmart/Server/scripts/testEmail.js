import nodemailer from "nodemailer";
import "dotenv/config";

const testEmail = async () => {
  console.log(" Testing Email Configuration...\n");

  // Check environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailFrom = process.env.EMAIL_FROM;

  if (!emailUser || !emailPass) {
    console.error(" ERROR: EMAIL_USER or EMAIL_PASS not set in .env file");
    console.error(" Please create a .env file with:");
    console.error("   EMAIL_USER=your.email@gmail.com");
    console.error("   EMAIL_PASS=your_app_password_here");
    console.error("   EMAIL_FROM=your.email@gmail.com\n");
    process.exit(1);
  }

  console.log(`✓ EMAIL_USER: ${emailUser}`);
  console.log(`✓ EMAIL_FROM: ${emailFrom || emailUser}\n`);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Verify connection
  console.log("🔗 Verifying SMTP connection...");
  try {
    await transporter.verify();
    console.log("✓ SMTP connection successful!\n");
  } catch (error) {
    console.error("❌ SMTP connection failed:");
    console.error(error.message);
    console.error("\n💡 Fix: Use a Gmail App Password, not your account password.");
    console.error("   Go to: https://myaccount.google.com/apppasswords");
    process.exit(1);
  }

  // Send test email
  console.log("📧 Sending test email...");
  try {
    const info = await transporter.sendMail({
      from: `"QuickMart Test" <${emailFrom || emailUser}>`,
      to: emailUser,
      subject: "QuickMart Email Test - Setup Successful",
      html: `
        <h2>✓ Email Setup Successful!</h2>
        <p>Your QuickMart email system is configured correctly.</p>
        <p>Order confirmation emails will be sent automatically when:</p>
        <ul>
          <li>A customer places a COD order</li>
          <li>A Stripe payment is successfully completed</li>
        </ul>
        <p><b>– Team QuickMart</b></p>
      `,
    });

    console.log("✓ Test email sent successfully!");
    console.log(`   Message ID: ${info.messageId}\n`);
    console.log(" All systems ready! Start your server with: npm run dev\n");
  } catch (error) {
    console.error("Failed to send test email:");
    console.error(error.message);
    process.exit(1);
  }
};

testEmail().catch(console.error);
