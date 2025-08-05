import React from "react";
import { FaTruck, FaLeaf, FaClock, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page" style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#2c3e50", marginBottom: "30px" }}>
          About QuickMart
        </h1>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#555" }}>
          At <strong>QuickMart</strong>, we believe grocery shopping should be fast, fresh, and hassle-free. Our mission is
          to bring the freshest fruits, vegetables, and daily essentials straight to your doorstep with just a few clicks.
        </p>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginTop: "15px", color: "#555" }}>
          With a growing range of quality products, secure payments via <strong>Stripe</strong>, and real-time order tracking,
          we’re committed to making your grocery experience simpler and smarter.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "40px", gap: "30px", justifyContent: "center" }}>
          <Feature icon={<FaLeaf size={30} color="#27ae60" />} title="Fresh Products" desc="We source daily from trusted farms and suppliers to ensure top quality." />
          <Feature icon={<FaTruck size={30} color="#2980b9" />} title="Fast Delivery" desc="Same-day and next-day delivery options to fit your schedule." />
          <Feature icon={<FaClock size={30} color="#e67e22" />} title="24/7 Shopping" desc="Order anytime from anywhere with our easy-to-use platform." />
          <Feature icon={<FaCheckCircle size={30} color="#16a085" />} title="Secure Checkout" desc="Pay safely with Stripe or Cash on Delivery options." />
        </div>

        <div style={{ marginTop: "50px", textAlign: "center", fontSize: "1.2rem", color: "#444" }}>
          <p>
            Thank you for choosing <strong>QuickMart</strong> – Your everyday essentials, delivered with care.
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div style={{ flex: "1 1 200px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
    <div style={{ marginBottom: "10px" }}>{icon}</div>
    <h3 style={{ marginBottom: "8px", fontSize: "1.2rem", color: "#2c3e50" }}>{title}</h3>
    <p style={{ fontSize: "0.95rem", color: "#666" }}>{desc}</p>
  </div>
);

export default About;
