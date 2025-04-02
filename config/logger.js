const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const configureLogger = (app) => {
  const logDirectory = path.join(__dirname, '../logs'); // Adjust path as needed

  // Ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  // Create rotating write stream for access logs
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // Rotate daily
    path: logDirectory,
  });

  // Create rotating write stream for error logs
  const errorLogStream = rfs.createStream('error.log', {
    interval: '1d', // Rotate daily
    path: logDirectory,
  });

  // Middleware to log access requests
  app.use(
    morgan('combined', {
      stream: accessLogStream,
      skip: function (req, res) {
        return res.statusCode >= 400; // Skip logging errors to access log
      },
    })
  );

  // Middleware to log errors and warnings to file and console
  app.use(
    morgan('dev', {
      // Use 'dev' format for console output (colored)
      skip: function (req, res) {
        return res.statusCode < 400; // Skip logging non-errors to console
      },
    }),
    morgan('combined', {
      // Keep logging to file
      stream: errorLogStream,
      skip: function (req, res) {
        return res.statusCode < 400; // Skip logging non-errors to file
      },
    })
  );
};

module.exports = configureLogger;
