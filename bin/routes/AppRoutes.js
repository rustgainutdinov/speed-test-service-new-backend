"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoute_1 = require("./UserRoute");
const DomainRoute_1 = require("./DomainRoute");
const UrlRoute_1 = require("./UrlRoute");
const PagesRoute_1 = require("./PagesRoute");
const TestingServerRoute_1 = require("./TestingServerRoute");
class AppRoutes {
    constructor() {
        this.routeList = [
            { path: '/user', router: UserRoute_1.default },
            { path: '/domain', router: DomainRoute_1.default },
            { path: '/url', router: UrlRoute_1.default },
            { path: '/pages', router: PagesRoute_1.default },
            { path: '/testing_server', router: TestingServerRoute_1.default },
        ];
    }
    mount(expApp) {
        this.routeList.forEach((item) => {
            expApp.use(item.path, item.router.createRouter(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
