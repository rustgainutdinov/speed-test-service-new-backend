"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const AppRoutes_1 = require("./routes/AppRoutes");
const DataBaseProvider_1 = require("./data_provider/DataBaseProvider");
const errorHangler_1 = require("./methods/app/errorHangler");
const setResponseSettings_1 = require("./methods/app/setResponseSettings");
class App {
    constructor(config) {
        this.config = config;
        if (App.app instanceof App) {
            throw new Error('Нельзя создать более одного экземпляра приложения');
        }
        this.config = config;
        this.dataBaseProvider = new DataBaseProvider_1.default(this.config.db);
        this.expApp = express();
        App.app = this;
    }
    static getDBInstance() {
        return DataBaseProvider_1.default.getDBInstance();
    }
    run() {
        this.expApp.use(bodyParser.urlencoded({
            extended: false
        }));
        this.expApp.use(bodyParser.json());
        this.expApp.use(setResponseSettings_1.default);
        this.expApp.use(errorHangler_1.default);
        let appRouter = new AppRoutes_1.default();
        appRouter.mount(this.expApp);
        this.expApp.listen(this.config.listenPort, (err) => {
            if (err !== undefined) {
                console.log(err);
            }
            else {
                console.log("Server run on port: " + this.config.listenPort);
            }
        });
    }
}
exports.default = App;
