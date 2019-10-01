import IQueryArray from "../../interfaces/db/IQueryArray";

const googleSpeedTestQueries: IQueryArray = [
    {
        name: 'add_new_test',
        rights: 0,
        sql: `INSERT INTO test (id_test, date_time)
					VALUES (?(idTest), now());`
    },
    {
        name: 'get_statistics_for_main_page',
        rights: 100,
        sql: 'SELECT date_trunc(\'day\', date_time)::date as date, mode, d3.id_domain, d3.name as domain, u.name as url, value ' +
            'FROM test ' +
            '         INNER JOIN test_data d2 on test.id_test = d2.id_test ' +
            '         INNER JOIN url u on d2.id_url = u.id_url ' +
            '         INNER JOIN domain d3 on u.id_domain = d3.id_domain ' +
            '         INNER JOIN indicator_name "in" on d2.id_indicator_name = "in".id_indicator_name ' +
            'WHERE by_user = false ' +
            '  AND d3.favourite = true ' +
            '  AND date_trunc(\'day\', date_time) > date_trunc(\'day\', now() - interval \'7 days\') ' +
            '  AND d3.is_deleted = \'FALSE\' ' +
            '  AND u.is_deleted = \'FALSE\' ' +
            '  AND d3.favourite = \'TRUE\' ' +
            '  AND u.favourite = \'TRUE\' ' +
            '  AND "in".name = \'performance\';'
    },










    {
        name: 'get_urls_list_with_performance_by_domain_name',
        rights: 100,
        sql: 'SELECT "url".name as url, ' +
            '       (SELECT performance FROM test_data INNER JOIN test t on test_data.id_test = t.id_test WHERE "test_data".id_url = "url".id_url ' +
            '                                           AND mode = \'mobile\' ORDER BY date_time DESC LIMIT 1)  as mobile_performance, ' +
            '       (SELECT performance FROM test_data INNER JOIN test t on test_data.id_test = t.id_test WHERE "test_data".id_url = "url".id_url ' +
            '                                           AND mode = \'desktop\' ORDER BY date_time DESC LIMIT 1) as desktop_performance ' +
            'FROM url ' +
            '       INNER JOIN domain d2 on url.id_domain = d2.id_domain ' +
            'WHERE d2.name = ?(domainName)' +
            '      AND d2.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_performance_data_by_url_name_and_date',
        rights: 100,
        sql: 'SELECT performance, date_trunc(\'day\', date_time)::date as date, u.name as url, mode ' +
            'FROM test_data ' +
            '            INNER JOIN test t on test_data.id_test = t.id_test ' +
            '            INNER JOIN url u on test_data.id_url = u.id_url ' +
            'WHERE date_time >= ?(startDate) ' +
            '  AND date_time <= ?(endDate) ' +
            '  AND u.name IN ?IN[?{urls}] ' +
            '      AND u.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_urls',
        rights: 100,
        sql: 'SELECT name FROM url WHERE url.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_indicators_by_url_name',
        rights: 0,
        sql: 'SELECT performance,' +
            '       first_contentful_paint,' +
            '       speed_index,' +
            '       interactive,' +
            '       first_meaningful_paint,' +
            '       first_cpu_idle,' +
            '       estimated_input_latency,' +
            '       uses_rel_preload,' +
            '       render_blocking_resources,' +
            '       unused_css_rules,' +
            '       mainthread_work_breakdown,' +
            '       mainthread_work_breakdown,' +
            '       uses_long_cache_ttl,' +
            '       dom_size,' +
            '       bootup_time,' +
            '       offscreen_images,' +
            '       unminified_javascript,' +
            '       unminified_css,' +
            '       uses_optimized_images,' +
            '       time_to_first_byte,' +
            '       redirects,' +
            '		mode ' +
            'FROM test_data ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test ' +
            'WHERE u.name = ?(url) ' +
            '      AND u.is_deleted = \'FALSE\' ' +
            'ORDER BY date_time DESC ' +
            'LIMIT 2;'
    },
    {
        name: 'get_all_indicators_in_recent_month',
        rights: 0,
        sql: 'SELECT performance, ' +
            '       first_contentful_paint, ' +
            '       speed_index, ' +
            '       interactive, ' +
            '       first_meaningful_paint, ' +
            '       first_cpu_idle, ' +
            '       estimated_input_latency, ' +
            '       uses_rel_preload, ' +
            '       render_blocking_resources, ' +
            '       unused_css_rules, ' +
            '       mainthread_work_breakdown, ' +
            '       mainthread_work_breakdown, ' +
            '       uses_long_cache_ttl, ' +
            '       dom_size, ' +
            '       bootup_time, ' +
            '       offscreen_images, ' +
            '       unminified_javascript, ' +
            '       unminified_css, ' +
            '       uses_optimized_images, ' +
            '       time_to_first_byte, ' +
            '       redirects, ' +
            '       mode ' +
            'FROM test_data ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test ' +
            'WHERE u.name = ?(url) ' +
            '  AND date_time >= ?(startDate) ' +
            '  AND date_time <= ?(endDate) ' +
            '      AND u.is_deleted = \'FALSE\' ' +
            'ORDER BY date_time DESC ' +
            '    OFFSET 2;'
    },
    {
        name: 'get_selected_indicators_by_url_and_date',
        rights: 100,
        sql: 'SELECT performance, ?onlyString(indicators) date_trunc(\'day\', t.date_time)::date as date, mode ' +
            'FROM test_data ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url ' +
            'WHERE u.name = ?(url) ' +
            '  AND date_time >= ?(startDate) ' +
            '  AND date_time <= ?(endDate) ' +
            '  AND u.is_deleted = \'FALSE\';'
    }
];

export default googleSpeedTestQueries
