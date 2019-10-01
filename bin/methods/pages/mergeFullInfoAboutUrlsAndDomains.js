"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupDataByDomainName_1 = require("../domain/groupDataByDomainName");
function mergeFullInfoAboutUrlsAndDomains(urlsData, domainsData) {
    const groupedByDomainNameUrlsInfo = groupDataByDomainName_1.default(urlsData);
    let fullInfoAboutUrlsAndDomains = [];
    domainsData.forEach((fullDomainData) => {
        fullInfoAboutUrlsAndDomains.push(Object.assign(fullDomainData, {
            urlsList: groupedByDomainNameUrlsInfo[fullDomainData.domain]
        }));
    });
    return fullInfoAboutUrlsAndDomains;
}
exports.default = mergeFullInfoAboutUrlsAndDomains;
