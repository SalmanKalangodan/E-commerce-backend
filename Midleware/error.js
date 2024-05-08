
// Error handling middleware function
export const errorHandler = (err, req, res) => {

    // Set a default error message and status code
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    // Check if the error has validation errors
    if (err.errors && Object.keys(err.errors).length > 0) {
        // If it does, extract the validation error messages and set status code to 400
        errorMessage = Object.values(err.errors).map(error => error.message);
        statusCode = 400;
    }

    // Send an error response with the appropriate status code and message
    res.status(statusCode).json({ message: errorMessage });
};

