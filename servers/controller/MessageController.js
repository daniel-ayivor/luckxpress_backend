const Message = require("../model/MessageModel");
const nodemailer = require("nodemailer");

const handleMessage = async (req, res) => {
    const { name, email, contact, text } = req.body;

    try {
        // Save the message to the database
        const newMessage = new Message({ name, email, contact, text });
        await newMessage.save();

        // Send an email notification to the admin
      // Send Reset Email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
         subject: 'New Message from Contact Form',
        text: `You have received a new message from ${name} (${email}, ${contact}):\n\n"${text}"`
    };

    await transporter.sendMail(mailOptions);

        // const mailOptions = {
        //     from: process.env.EMAIL_USER, // Sender's email
        //     to:  process.env.EMAIL_USER, // Admin's email address
        //     subject: 'New Message from Contact Form',
        //     text: `You have received a new message from ${name} (${email}, ${contact}):\n\n"${text}"`
        // };

        // await transporter.sendMail(mailOptions);

        // Respond to the client
        res.status(200).json({ message: "Message received and forwarded to admin successfully." });
    } catch (error) {
        console.error("Error handling message:", error);
        res.status(500).json({ error: "An error occurred while processing your message." });
    }
};

const SendMail =async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports = handleMessage;
