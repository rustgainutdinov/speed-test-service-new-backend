"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const appConfig_1 = require("./config/appConfig");
try {
    const app = new App_1.default(appConfig_1.default);
    app.run();
}
catch (e) {
    console.error(e.message);
}
