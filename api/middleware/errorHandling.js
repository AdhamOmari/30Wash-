// middleware/errorHandling.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging (you can customize this part)
    console.error(err);
  
    // Set a default status code and error message
    let statusCode = 500;
    let errorMessage = 'An error occurred';
  
    // Handle specific error types
    if (err instanceof MyCustomError) {
      statusCode = err.statusCode;
      errorMessage = err.message;
    } else if (err instanceof AnotherCustomError) {
      statusCode = err.statusCode;
      errorMessage = err.message;
    }
  
    // Send an error response
    res.status(statusCode).json({ message: errorMessage, error: err.message });
  };
  
  module.exports = errorHandler;
  