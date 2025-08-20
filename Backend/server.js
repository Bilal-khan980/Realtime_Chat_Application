const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./schemas/user");
const Chats = require("./schemas/chat");
const Message = require("./schemas/message");
const chats = require("./schemas/chat");

const app = express();
const port = 8000;
const JWT_SECRET = "#$%^&*(BBbb#$%^&xyviybvg$%^&FCUV56^UYHGVTY&%$RDD4&&567#$%^&8765"; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongouri = "mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/Chatapp";
mongoose
  .connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB connection error:", err.message));


//Make a new user;
app.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token , user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });

  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded; 
    next();
  });
}

//get user information
app.use("/userinfo", authMiddleware, (req, res) => {
  User.findById(req.user.id, "-password")
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ user });
    })
    .catch(err => {
      console.error("Error fetching user info:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//create new chat
app.post("/chats",authMiddleware, async (req, res) => { 
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Chats({ members: [senderId, receiverId] });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all chats for a user
app.get('/chats/:userId',authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all chats where the user is a member
    const chats = await Chats.find({ members: { $in: [userId] } });

    // Collect receiver data for each chat
    const chatsData = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.members.find(
          (member) => member.toString() !== userId
        );

        const user = await User.findById(receiverId);

        return {
          chatId: chat._id,
          user: user ? {
            email: user.email,
            fullname: user.fullname
          } : null
        };
      })
    );

    res.status(200).json(chatsData);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/sendmessage", authMiddleware,async (req, res) => { 
  try {
    const { chatId, senderId, message } = req.body;

    const newMessage = new Message({
      chatId,
      senderId,
      message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getmessages/:chatId",authMiddleware, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chatId });
    
  

    const messagedata = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.senderId);
        
        return {
          user: { 
            _id: user._id, 
            fullname: user.fullname
          },
          message: message.message,
        };
      })
    );

    
    if (!messagedata || messagedata.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(messagedata);

  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/allusers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Get all chats of the current user
    const userChats = await Chats.find({ members: { $in: [userId] } });

    // 2. Collect all members from these chats
    const existingChatUserIds = userChats.flatMap(chat => chat.members);

    // 4. Now fetch all users who are NOT in this list
    const users = await User.find({ _id: { $nin: existingChatUserIds } });

    // 5. Map user details for response
    const userdata = users.map(u => ({
      _id: u._id,
      fullname: u.fullname,
      email: u.email
    }));

    res.status(200).json(userdata);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  
});
