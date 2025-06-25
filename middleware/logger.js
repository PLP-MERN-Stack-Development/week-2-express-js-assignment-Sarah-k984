// middleware/logger.js

const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware/route handler
};

module.exports = logger;
