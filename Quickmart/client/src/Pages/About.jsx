import React from "react";

const About = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      
      {/* Hero Section */}
      <section
        style={{
          background: "url('https://img.freepik.com/free-photo/healthy-food-background-studio-photo-different-fruits-vegetables-black-table_155003-32946.jpg') center/cover no-repeat",
          color: "#fff",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "15px" }}>
          Welcome to QuickMart 🛒
        </h1>
        <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
          Your trusted online grocery store – delivering freshness, quality, and convenience at your doorstep.
        </p>
      </section>

      {/* Our Mission Section */}
      <section style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          
          {/* Text */}
          <div>
            <h2 style={{ fontSize: "32px", color: "#2E7D32", marginBottom: "15px" }}>🌱 Our Mission</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
              At <strong>QuickMart</strong>, we aim to simplify grocery shopping by offering a wide
              range of fresh, affordable, and high-quality products. We partner with local farmers
              and trusted suppliers to bring you only the best.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://img.freepik.com/free-photo/basket-full-vegetables_1112-316.jpg"
              alt="Mission QuickMart"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us - Cards */}
      <section style={{ background: "#f5f5f5", padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", color: "#388E3C", marginBottom: "40px" }}>
          🚀 Why Choose QuickMart?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { title: "Fresh & Organic", desc: "Handpicked fruits and vegetables directly from farms." },
            { title: "Wide Variety", desc: "From groceries to household essentials, all in one place." },
            { title: "Affordable Prices", desc: "Best deals and discounts for your daily needs." },
            { title: "Fast Delivery", desc: "Get your groceries delivered to your doorstep quickly." },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={{ color: "#2E7D32", marginBottom: "10px" }}>{card.title}</h3>
              <p style={{ fontSize: "16px", color: "#555" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          
          {/* Image */}
          <div>
            <img
              src="https://img.freepik.com/free-photo/grocery-shopping-basket-cart-filled-with-fresh-vegetables-isolated-white-background-generative-ai_1258-150754.jpg"
              alt="Our Story"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
            />
          </div>

          {/* Text */}
          <div>
            <h2 style={{ fontSize: "32px", color: "#2E7D32", marginBottom: "15px" }}>📍 Our Story</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
              QuickMart started as a small neighborhood shop with a big dream – 
              to make grocery shopping simple and enjoyable. Today, we proudly 
              serve thousands of happy families, delivering not just groceries, 
              but trust, convenience, and care.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "#2E7D32", color: "#fff", textAlign: "center", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Ready to Shop with QuickMart?</h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Get your groceries delivered fast, fresh, and affordably.
        </p>
        <a
          href="/products"
          style={{
            background: "#fff",
            color: "#2E7D32",
            padding: "14px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#f1f1f1")}
          onMouseOut={(e) => (e.target.style.background = "#fff")}
        >
          🛍️ Start Shopping
        </a>
      </section>
    </div>
  );
};

export default About;
