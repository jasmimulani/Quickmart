import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message  , contact } = req.body;

    if (!name || !email || !message || !contact) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    await Contact.create({ name, email, message , contact });

    res.status(201).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
