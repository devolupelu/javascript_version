"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app_1 = __importDefault(require("./routes/app"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./config"));
const connection_1 = require("./startup/connection");
// Database connection
(0, connection_1.connect_now)(config_1.default.conn).catch(err => {
    logger_1.default.error("Failed to connect to database:", err);
    process.exit(1);
});
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
// Enable Helmet middleware for security headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "example.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
}));
// Enable CORS for all routes
app.use(corsMiddleware);
// Enable request body parsing
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Enable Express Mongo Sanitize middleware to prevent MongoDB injection
app.use((0, express_mongo_sanitize_1.default)());
// Enable rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.set("trust proxy", "loopback"); // specify a single subnet
app.get("/", (req, res) => {
    res.json("Hello World");
});
// Set up your routes
app.use("/youthFellowship/v1", (0, app_1.default)());
const port = config_1.default.port || 2300;
console.log("port", port);
app.listen(port, () => console.log("The application is running on port", port));
// Graceful shutdown
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM signal received: closing HTTP server');
    app.listen().close(() => {
        logger_1.default.info('HTTP server closed');
    });
});
