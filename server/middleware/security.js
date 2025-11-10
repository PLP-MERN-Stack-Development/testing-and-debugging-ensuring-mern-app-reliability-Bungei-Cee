const express = require("express"); // <-- ADD THIS
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  // Secure HTTP headers
  app.use(helmet());

  // Parse JSON requests
  app.use(express.json({ limit: "10kb" }));

  // CORS
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.CLIENT_URL
          : "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per window
  });
  app.use(limiter);
};
