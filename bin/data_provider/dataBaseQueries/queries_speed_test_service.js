"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speedTestServiceQueries = [
    {
        name: 'get_speed_test_service_info_by_ip',
        rights: 0,
        sql: `SELECT key_hash, token, port
					FROM speed_test_service
					WHERE ip = ?(ip);`
    },
    {
        name: 'set_speed_test_service_token',
        rights: 0,
        sql: `UPDATE speed_test_service
					SET token = ?(token)
					WHERE ip = ?(ip);`
    },
    {
        name: 'save_testing_data',
        rights: 0,
        sql: 'INSERT INTO test_data (id_user, id_speed_test_service, id_test, id_indicator_name, id_url, mode, value) ' +
            'VALUES ?[?{data} NULL,' +
            '    (SELECT id_speed_test_service FROM speed_test_service WHERE token = ?(token)),' +
            '    ?(idTest),' +
            '    (SELECT id_indicator_name FROM indicator_name WHERE name = ?(indicator)),' +
            '    (SELECT id_url FROM url WHERE name = ?(url)),' +
            ' ?(mode), ?(value)]'
    },
    {
        name: 'get_last_url_speed_test_data',
        rights: 0,
        sql: 'SELECT * ' +
            'FROM test_data ' +
            '       INNER JOIN url u on test_data.id_url = u.id_url ' +
            '       INNER JOIN test t on test_data.id_test = t.id_test ' +
            'WHERE u.name = ?(url) ' +
            'AND mode = ?(mode) ' +
            'ORDER BY t.date_time DESC ' +
            'LIMIT 2 ' +
            'OFFSET 2;'
    },
    {
        name: 'get_urls_name_by_test_id',
        rights: 0,
        sql: 'SELECT DISTINCT u.name ' +
            'FROM test ' +
            '         INNER JOIN test_data td on test.id_test = td.id_test ' +
            '         INNER JOIN url u on td.id_url = u.id_url ' +
            'WHERE test.id_test = ?(idTest);'
    }
];
exports.default = speedTestServiceQueries;
