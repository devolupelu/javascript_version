/********************************************************************
 * FILE: src/app.js
 ********************************************************************/

import express from "express";
import bodyParser from "body-parser";
import router from "./routes/app.js";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import Logger from "./utils/logger.js";
import config from "./config.js";
import  connect_now  from "./startup/connection.js";

// 1) Database Connection
Logger.debug("Attempting to connect to database...");
connect_now(config.conn)
  .then(() => {
    Logger.debug("Database connection successful.");
  })
  .catch((err) => {
    Logger.error("Failed to connect to database:", err);
    process.exit(1);
  });

Logger.debug("Initializing Express application...");
const app = express();

// 2) CORS Setup
const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};
Logger.debug("Setting up CORS middleware...");
app.use(cors(corsOptions));

// 3) Helmet Security Headers
Logger.debug("Applying Helmet security headers...");
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "example.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// 4) Body Parser & JSON Parsing
Logger.debug("Enabling request body parsing (JSON & URL-encoded)...");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 5) Mongo Sanitize
Logger.debug("Applying Mongo Sanitize middleware...");
app.use(mongoSanitize());

// 6) Rate Limiting
Logger.debug("Applying rate limiting (max 100 requests / 15 mins)...");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// 7) Express Settings
Logger.debug("Setting trust proxy to 'loopback'...");
app.set("trust proxy", "loopback");

// 8) Root Route
Logger.debug("Defining root endpoint...");
app.get("/", (req, res) => {
  Logger.debug("Root endpoint hit.");
  res.json("Hello World");
});

// 9) Main Routes
Logger.debug("Mounting router on /youthFellowship/v1...");
app.use("/youthFellowship/v1", router());

// 10) Start the Server & Store the Instance
const port = config.port || 2300;
Logger.debug(`Server port from config or default is: ${port}`);

Logger.debug("Starting HTTP server...");
const server = app.listen(port, () => {
  Logger.info(`The application is running on port ${port}`);
});


/********************************************************************
 * Notes:
 * - Make sure connect_now and config.conn are properly defined.
 * - Ensure Logger has .debug(), .info(), and .error() methods.
 * - router() should return an Express Router instance.
 * - This code stores 'server' in a variable for proper shutdown.
 ********************************************************************/
