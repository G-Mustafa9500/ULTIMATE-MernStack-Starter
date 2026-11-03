// ─── 404 Handler ──────────────────────────────────────────────────────────────
export const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// ─── Global Error Handler ─────────────────────────────────────────────────────
export const errorHandler = (err, req, res, _next) => {
  let status  = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose duplicate key
  if (err.code === 11000) {
    status  = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `${field} already exists`;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    status  = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError')  { status = 401; message = 'Invalid token'; }
  if (err.name === 'TokenExpiredError')  { status = 401; message = 'Token expired'; }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
