"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Url_1 = require("../../classes/Url");
const Domain_1 = require("../../classes/Domain");
const mergeFullInfoAboutUrlsAndDomains_1 = require("./mergeFullInfoAboutUrlsAndDomains");
function getInfoAboutUrlAndDomainForAdminPanel(user, onSuccess, onError) {
    Url_1.default.getFullInfoAboutAllUrls(user, (urlsData) => {
        Domain_1.default.getFullInfoAboutAllDomains(user, (domainsData) => {
            onSuccess(mergeFullInfoAboutUrlsAndDomains_1.default(urlsData, domainsData));
        }, onError);
    }, onError);
}
exports.default = getInfoAboutUrlAndDomainForAdminPanel;
