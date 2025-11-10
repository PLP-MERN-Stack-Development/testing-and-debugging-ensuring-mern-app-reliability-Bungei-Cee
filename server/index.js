import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // <-- import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true // if you want to send cookies
}));

app.use(express.json());

// Example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
