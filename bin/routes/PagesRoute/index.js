"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInfoAboutUrlAndDomainForAdminPanel_1 = require("./getInfoAboutUrlAndDomainForAdminPanel");
const PagesRoute = {
    createRouter(router) {
        return router()
            .get('/get_info_about_urls_and_domain_for_admin_panel', getInfoAboutUrlAndDomainForAdminPanel_1.default);
    }
};
exports.default = PagesRoute;
