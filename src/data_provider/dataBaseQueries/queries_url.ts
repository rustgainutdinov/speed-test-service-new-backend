import IQueryArray from "../../interfaces/db/IQueryArray";

const urlQueries: IQueryArray = [
    {
        name: 'add_new_url',
        rights: 200,
        sql: `INSERT INTO url(name, added_by, id_domain, favourite)
					VALUES (?(urlName),
					(SELECT id_user FROM "user" WHERE token = ?(token)),
					(SELECT id_domain FROM domain WHERE name = ?(domainName)),
					?(isFavourite));`
    },
    {
        name: 'change_url_is_favourite_field',
        rights: 200,
        sql: 'UPDATE url SET favourite = ?(isFavourite) WHERE name = ?(url);'
    },
    {
        name: 'remove_url',
        rights: 200,
        sql: 'UPDATE url SET is_deleted = \'TRUE\' WHERE name = ?(url);'
    },
    {
        name: 'get_full_info_about_all_urls',
        rights: 200,
        sql: 'SELECT url.name as url, d.name as domain, u.name as added_by, url.favourite  ' +
            'FROM url  ' +
            '         INNER JOIN domain d on url.id_domain = d.id_domain  ' +
            '         INNER JOIN "user" u on url.added_by = u.id_user ' +
            '         WHERE url.is_deleted = \'FALSE\' AND d.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_urls',
        rights: 200,
        sql: 'SELECT name FROM url WHERE url.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_selected_indicators_by_url_and_date',
        rights: 100,
        sql: 'SELECT date_trunc(\'day\', t.date_time)::date as date, mode, "in".name as indicator, value, u.name as url, d.name as domain  ' +
            'FROM test_data  ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test  ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url  ' +
            '         INNER JOIN domain d on u.id_domain = d.id_domain  ' +
            '         INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name  ' +
            'WHERE u.name = ?(url)  ' +
            '  AND date_time >= ?(startDate)  ' +
            '  AND date_time <= ?(endDate)  ' +
            '  AND ("in".name IN ?IN[?{indicators}] OR "in".name = \'performance\')  ' +
            '  AND u.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_indicators_by_url_and_date',
        rights: 0,
        sql: 'SELECT date_trunc(\'day\', t.date_time)::date as date, mode, "in".name as indicator, value, u.name as url, d.name as domain  ' +
            'FROM test_data  ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test  ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url  ' +
            '         INNER JOIN domain d on u.id_domain = d.id_domain  ' +
            '         INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name  ' +
            'WHERE u.name = ?(url)  ' +
            '  AND date_time >= ?(startDate)  ' +
            '  AND date_time <= ?(endDate)  ' +
            '  AND u.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_last_indicators_by_url',
        rights: 0,
        sql: 'SELECT date_trunc(\'day\', t.date_time)::date as date, mode, "in".name as indicator, value, u.name as url, d.name as domain  ' +
            'FROM test_data  ' +
            '         INNER JOIN test t on test_data.id_test = t.id_test  ' +
            '         INNER JOIN url u on test_data.id_url = u.id_url  ' +
            '         INNER JOIN domain d on u.id_domain = d.id_domain  ' +
            '         INNER JOIN indicator_name "in" on test_data.id_indicator_name = "in".id_indicator_name  ' +
            'WHERE u.name = ?(url)  ' +
            '  AND u.is_deleted = \'FALSE\' ' +
            '  ORDER BY date_time DESC  ' +
            '  LIMIT 40;'
    }
];

export default urlQueries