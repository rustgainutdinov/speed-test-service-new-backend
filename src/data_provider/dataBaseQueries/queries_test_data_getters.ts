import IQueryArray from "../../interfaces/db/IQueryArray";

const testDataGettersQueries: IQueryArray = [
    {
        name: 'get_performance_data_for_last_week',
        rights: 100,
        sql: 'SELECT date_trunc(\'day\', date_time)::date as date, mode, d3.name as domain, u.name as url, value ' +
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
        name: 'get_urls_list_with_performance',
        rights: 100,
        sql: 'SELECT "url".name as url, ' +
            '       (SELECT test_data.value ' +
            '        FROM test_data ' +
            '                 INNER JOIN test t on test_data.id_test = t.id_test ' +
            '                 INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name ' +
            '        WHERE test_data.id_url = url.id_url ' +
            '          AND mode = \'mobile\' ' +
            '          AND "in".name = \'performance\' ' +
            '        ORDER BY date_time DESC ' +
            '        LIMIT 1)  as mobile_performance, ' +
            '       (SELECT test_data.value ' +
            '        FROM test_data ' +
            '                 INNER JOIN test t on test_data.id_test = t.id_test ' +
            '                 INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name ' +
            '        WHERE "test_data".id_url = "url".id_url ' +
            '          AND mode = \'desktop\' ' +
            '          AND "in".name = \'performance\' ' +
            '        ORDER BY date_time DESC ' +
            '        LIMIT 1)  as desktop_performance ' +
            'FROM url ' +
            '         INNER JOIN domain d2 ' +
            '                    on url.id_domain = d2.id_domain ' +
            'WHERE d2.name = ?(domain) ' +
            '  AND d2.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_performance_by_url_and_date',
        rights: 100,
        sql: 'SELECT value                              as value, ' +
            '       "in".name                          as indicator, ' +
            '       d1.name                        as domain, ' +
            '       date_trunc(\'day\', date_time)::date as date, ' +
            '       u.name                             as url, ' +
            '       mode ' +
            'FROM test_data ' +
            '         INNER JOIN test t1 on test_data.id_test = t1.id_test ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url ' +
            '         INNER JOIN domain d1 ON u.id_domain = d1.id_domain ' +
            '         INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name ' +
            'WHERE date_time >= ?(startDate) ' +
            '  AND date_time <= ?(endDate) ' +
            '  AND "in".name = \'performance\' ' +
            '  AND u.name IN ?IN[?{urls}] ' +
            '  AND u.is_deleted = \'FALSE\';'
    },
];

export default testDataGettersQueries