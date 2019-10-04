"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleSpeedTestQueries = [
    {
        name: 'add_new_test',
        rights: 0,
        sql: `INSERT INTO test (id_test, date_time)
					VALUES (?(idTest), now());`
    }
];
exports.default = googleSpeedTestQueries;
