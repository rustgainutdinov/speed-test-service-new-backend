"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const changeIsFavouriteField_1 = require("./changeIsFavouriteField");
const remove_1 = require("./remove");
const getSelectedIndicatorsByDate_1 = require("./getSelectedIndicatorsByDate");
const getFallenIndicators_1 = require("./getFallenIndicators");
const UrlRoute = {
    createRouter(router) {
        return router()
            .post('/create', create_1.default)
            .post('/change_is_favourite_field', changeIsFavouriteField_1.default)
            .post('/remove', remove_1.default)
            .get('/get_selected_indicators_by_date', getSelectedIndicatorsByDate_1.default)
            .get('/get_fallen_indicators', getFallenIndicators_1.default);
    }
};
exports.default = UrlRoute;
