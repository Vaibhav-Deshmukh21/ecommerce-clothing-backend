import Contact from "../model/contactModel.js";

// SEND CONTACT MESSAGE
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL CONTACT MESSAGES (ADMIN)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
};

// GET UNREAD MESSAGES COUNT
export const getUnreadMessagesCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments({ read: false });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching unread count" });
  }
};

// MARK MESSAGE AS READ
export const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, { read: true });
    res.status(200).json({ success: true, message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};