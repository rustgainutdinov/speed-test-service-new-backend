"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNamesListFromUrlsDataOnlyWithNameList(urlsData) {
    let namesList = [];
    urlsData.forEach(item => {
        namesList.push(item.name);
    });
    return namesList;
}
exports.default = getNamesListFromUrlsDataOnlyWithNameList;
