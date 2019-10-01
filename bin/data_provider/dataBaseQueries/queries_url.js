"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlQueries = [
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
];
exports.default = urlQueries;
