"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortByDeviceByDomain_1 = require("./sortByDeviceByDomain");
const sortByDeviceByMode_1 = require("./sortByDeviceByMode");
function sortTestDataByDomainAndMode(testDataList) {
    const sortedByDomainTestData = sortByDeviceByDomain_1.default(testDataList);
    let sortedByDomainAndModeTestData = {};
    for (let domain in sortedByDomainTestData) {
        sortedByDomainAndModeTestData[domain] = sortByDeviceByMode_1.default(sortedByDomainTestData[domain]);
    }
    return sortedByDomainAndModeTestData;
}
exports.default = sortTestDataByDomainAndMode;
