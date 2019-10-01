"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function groupDataByDomainName(data) {
    let sortedData = {};
    data.forEach((item) => {
        if (!sortedData[item.domain]) {
            sortedData[item.domain] = [];
        }
        sortedData[item.domain].push(item);
    });
    return sortedData;
}
exports.default = groupDataByDomainName;
