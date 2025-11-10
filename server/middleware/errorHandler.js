module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
