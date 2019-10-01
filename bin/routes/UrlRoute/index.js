"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const changeIsFavouriteField_1 = require("./changeIsFavouriteField");
const remove_1 = require("./remove");
const UrlRoute = {
    createRouter(router) {
        return router()
            .post('/create', create_1.default)
            .post('/change_is_favourite_field', changeIsFavouriteField_1.default)
            .post('/remove', remove_1.default);
    }
};
exports.default = UrlRoute;
