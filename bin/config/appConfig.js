"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APP_CONFIG = {
    listenPort: 8001,
    appName: 'Example Application',
    db: {
        user: process.env.NODE_ENV === 'production' ? '' : 'postgres',
        host: 'localhost',
        database: process.env.NODE_ENV === 'production' ? '' : 'speed-test-service',
        password: process.env.NODE_ENV === 'production' ? '' : '!QA2ws#ED',
        port: 5432
    }
};
exports.default = APP_CONFIG;
