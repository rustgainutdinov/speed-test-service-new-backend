"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_google_speed_test_1 = require("./queries_google_speed_test");
const queries_user_1 = require("./queries_user");
const queries_domain_1 = require("./queries_domain");
const queries_speed_test_service_1 = require("./queries_speed_test_service");
const queries = Array.prototype.concat(queries_google_speed_test_1.googleSpeedTestQueries, queries_user_1.userQueries, queries_domain_1.domainQueries, queries_speed_test_service_1.speedTestServiceQueries);
exports.default = queries;
