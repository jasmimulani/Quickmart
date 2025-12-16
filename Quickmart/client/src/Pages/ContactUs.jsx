import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import Contact from "../../../Server/models/Contact";

const ContactUs = () => {
  const { axios } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email,contact, message } = formData;

    if (!name.trim() || !email.trim() || !contact.trim()||!message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/contact/contact", { name, email,contact, message  });
      if (data.success) {
        toast.success("Thanks for contacting QuickMart!");
        setFormData({ name: "", email: "", message: "" , contact: "" });
      } else {
        toast.error(data.message || "Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f9fbfc" }} aria-label="Contact QuickMart">
      {/* Hero Section */}
      <section
        style={{
          background: "url('https://img.freepik.com/free-photo/contact-us-customer-support-hotline-people-connect-call-customer-support_36325-164.jpg') center/cover no-repeat",
          color: "#fff",
          textAlign: "center",
          padding: "100px 20px",
        }}
        aria-label="Contact Hero"
      >
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Contact QuickMart</h1>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
          Have a question, feedback, or need help? We’re here to assist you.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 20px" }} aria-label="Contact Form and Info">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between" }}>
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 500px",
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
            aria-label="Send us a message"
          >
            <h2 style={{ color: "#2E7D32", marginBottom: "20px" }}>📩 Send us a Message</h2>

            <FormField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />

             <FormField
              label="contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder= "Your contact number"
              required
            />
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, height: "120px", resize: "vertical" }}
                placeholder="Type your message here..."
                aria-label="Message"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#95a5a6" : "#27ae60",
                color: "#fff",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
              aria-live="polite"
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#1e8449")}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#27ae60")}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "25px" }}>
            <ContactCard
              icon={<FaPhoneAlt size={22} color="#27ae60" />}
              title="Phone"
              value={<a href="tel:+919876543210" style={{ color: "#636e72", textDecoration: "none" }}>+91 98765 43210</a>}
            />
            <ContactCard
              icon={<FaEnvelope size={22} color="#2980b9" />}
              title="Email"
              value={<a href="mailto:support@quickmart.com" style={{ color: "#636e72", textDecoration: "none" }}>support@quickmart.com</a>}
            />
            <ContactCard
              icon={<FaMapMarkerAlt size={22} color="#e67e22" />}
              title="Address"
              value={<span style={{ color: "#636e72" }}>123 QuickMart Street, Mumbai, India</span>}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

/* Reusable Input Field */
const FormField = ({ label, type, name, value, onChange, placeholder, required }) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={inputStyle}
    />
  </div>
);

const labelStyle = { display: "block", marginBottom: "6px", fontWeight: "600", color: "#2c3e50" };

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "1rem",
  transition: "0.3s",
};

const ContactCard = ({ icon, title, value }) => (
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    }}
  >
    {icon}
    <div>
      <strong style={{ display: "block", color: "#2c3e50", fontSize: "1.1rem" }}>{title}</strong>
      <span style={{ color: "#636e72" }}>{value}</span>
    </div>
  </div>
);

export default ContactUs;
