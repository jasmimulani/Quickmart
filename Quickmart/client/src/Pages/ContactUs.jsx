import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    try {
      await axios.post("/contact", { name, email, message }); // updated endpoint
      alert("Thanks for contacting QuickMart!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Try again later.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "60px 20px", backgroundColor: "#f9fbfc" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#2c3e50", marginBottom: "30px" }}>
          Contact Us
        </h1>
        <p style={{ textAlign: "center", color: "#636e72", fontSize: "1.1rem", marginBottom: "50px" }}>
          Have a question, feedback, or just want to say hello? We'd love to hear from you.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 400px",
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Your full name"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="your@email.com"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, height: "100px", resize: "vertical" }}
                placeholder="Type your message here..."
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#27ae60",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>

          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <ContactInfo
              icon={<FaPhoneAlt size={20} color="#27ae60" />}
              title="Phone"
              value="+91 98765 43210"
            />
            <ContactInfo
              icon={<FaEnvelope size={20} color="#2980b9" />}
              title="Email"
              value="support@quickmart.com"
            />
            <ContactInfo
              icon={<FaMapMarkerAlt size={20} color="#e67e22" />}
              title="Address"
              value="123 QuickMart Street, Mumbai, India"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const ContactInfo = ({ icon, title, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    {icon}
    <div>
      <strong style={{ display: "block", color: "#2c3e50", fontSize: "1.1rem" }}>{title}</strong>
      <span style={{ color: "#636e72" }}>{value}</span>
    </div>
  </div>
);

export default ContactUs;
