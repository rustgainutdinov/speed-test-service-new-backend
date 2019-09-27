"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speedTestServiceQueries = [
    {
        name: 'get_speed_test_service_info_by_ip',
        rights: 0,
        sql: `SELECT key_hash, token, port
					FROM speed_test_service
					WHERE ip = ?(ip);`
    }, {
        name: 'set_speed_test_service_token',
        rights: 0,
        sql: `UPDATE speed_test_service
					SET token = ?(token)
					WHERE ip = ?(ip);`
    }, {
        name: 'add_speed_test_service_testing_data',
        rights: 0,
        sql: 'INSERT INTO test_data (performance, id_user, id_speed_test_service, id_test, id_url, ' +
            'first_contentful_paint, speed_index, interactive, first_meaningful_paint, first_cpu_idle, ' +
            'estimated_input_latency, uses_rel_preload, render_blocking_resources, unused_css_rules, ' +
            'mainthread_work_breakdown, uses_long_cache_ttl, dom_size, bootup_time, offscreen_images,' +
            ' unminified_css, unminified_javascript, uses_optimized_images, time_to_first_byte, redirects, mode) ' +
            'VALUES ?[?{data} ?(performance),' +
            '    NULL,' +
            '    (SELECT id_speed_test_service FROM speed_test_service WHERE token = ?(token)),' +
            '    ?(idTest),' +
            '    (SELECT id_url FROM url WHERE name = ?(url)),' +
            '?(first_contentful_paint), ?(speed_index), ?(interactive), ?(first_meaningful_paint), ' +
            '?(first_cpu_idle), ?(estimated_input_latency), ?(uses_rel_preload), ?(render_blocking_resources), ' +
            '?(unused_css_rules), ?(mainthread_work_breakdown), ?(uses_long_cache_ttl), ?(dom_size),' +
            ' ?(bootup_time), ?(offscreen_images), ?(unminified_css), ?(unminified_javascript),' +
            ' ?(uses_optimized_images), ?(time_to_first_byte), ?(redirects), ?(mode)]'
    }, {
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
    }
];
exports.speedTestServiceQueries = speedTestServiceQueries;
