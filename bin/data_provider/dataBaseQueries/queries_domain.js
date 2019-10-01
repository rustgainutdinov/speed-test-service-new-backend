"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domainQueries = [
    {
        name: 'add_new_domain',
        rights: 200,
        sql: `INSERT INTO domain (name, added_by, favourite)
				VALUES (?(domain), (SELECT id_user FROM "user"
				WHERE token = ?(token)), ?(isFavourite));`
    },
    {
        name: 'change_domain_is_favourite_field',
        rights: 200,
        sql: 'UPDATE domain SET favourite = ?(isFavourite) WHERE name = ?(domain);'
    },
    {
        name: 'remove_domain',
        rights: 200,
        sql: 'UPDATE domain SET is_deleted = \'TRUE\' WHERE name = ?(domain); ' +
            'UPDATE url SET is_deleted = \'TRUE\' WHERE id_domain = (SELECT id_domain FROM domain WHERE name = ?(domain));'
    },
    {
        name: 'get_urls_list_by_domain',
        rights: 100,
        sql: `SELECT "url".name
				FROM url
        INNER JOIN domain d2 on url.id_domain = d2.id_domain
				WHERE d2.name = ?(name);`
    },
    {
        name: 'get_full_info_about_all_domains',
        rights: 200,
        sql: 'SELECT domain.name as domain, u.name as added_by, favourite ' +
            'FROM domain ' +
            '         INNER JOIN "user" u on domain.added_by = u.id_user ' +
            'WHERE domain.is_deleted = \'FALSE\';'
    },
];
exports.default = domainQueries;
