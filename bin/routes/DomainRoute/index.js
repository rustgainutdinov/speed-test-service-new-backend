"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const changeIsFavouriteField_1 = require("./changeIsFavouriteField");
const remove_1 = require("./remove");
const getUrlsListByDomain_1 = require("./getUrlsListByDomain");
const getUrlsLIstWithPerformance_1 = require("./getUrlsLIstWithPerformance");
const getFullInfoAboutAllDomains_1 = require("./getFullInfoAboutAllDomains");
const changeDisplayPriority_1 = require("./changeDisplayPriority");
const DomainRoute = {
    createRouter(router) {
        return router()
            .post('/create', create_1.default)
            .post('/change_is_favourite_field', changeIsFavouriteField_1.default)
            .post('/remove', remove_1.default)
            .get('/get_urls_list', getUrlsListByDomain_1.default)
            .get('/get_urls_list_with_performance', getUrlsLIstWithPerformance_1.default)
            .get('/get_full_info_about_all_domains', getFullInfoAboutAllDomains_1.default)
            .post('/change_domain_priority', changeDisplayPriority_1.default);
    }
};
exports.default = DomainRoute;
