"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domainQueries = [
    {
        name: 'add_new_domain',
        rights: 200,
        sql: `INSERT INTO domain (name, added_by, favourite)
				VALUES (?(name), (SELECT id_user FROM "user"
				WHERE token = ?(token)), ?(isFavourite));`
    },
    {
        name: 'get_urls_list_by_domain',
        rights: 0,
        sql: `SELECT "url".name
				FROM url
        INNER JOIN domain d2 on url.id_domain = d2.id_domain
				WHERE d2.name = ?(name);`
    },
    {
        name: 'add_new_url',
        rights: 100,
        sql: `INSERT INTO url(name, added_by, id_domain, favourite)
					VALUES (?(name),
					(SELECT id_user FROM "user" WHERE token = ?(token)),
					(SELECT id_domain FROM domain WHERE name = ?(domainName)),
					?(isFavourite));`
    },
    {
        name: 'get_domains_list_for_admin_panel',
        rights: 200,
        sql: 'SELECT domain.name as domain, u.name as added_by, favourite ' +
            'FROM domain ' +
            '         INNER JOIN "user" u on domain.added_by = u.id_user ' +
            'WHERE domain.is_deleted = \'FALSE\';'
    },
    {
        name: 'get_all_urls_info',
        rights: 200,
        sql: 'SELECT url.name as url, d.name as domain, u.name as added_by, url.favourite  ' +
            'FROM url  ' +
            '         INNER JOIN domain d on url.id_domain = d.id_domain  ' +
            '         INNER JOIN "user" u on url.added_by = u.id_user ' +
            '         WHERE url.is_deleted = \'FALSE\' AND d.is_deleted = \'FALSE\';'
    },
    {
        name: 'change_domain_is_favourite_row',
        rights: 200,
        sql: 'UPDATE domain SET favourite = ?(isFavourite) WHERE name = ?(domain);'
    },
    {
        name: 'change_url_is_favourite_row',
        rights: 200,
        sql: 'UPDATE url SET favourite = ?(isFavourite) WHERE name = ?(url);'
    },
    {
        name: 'delete_domain',
        rights: 200,
        sql: 'UPDATE domain SET is_deleted = \'TRUE\' WHERE name = ?(domain); ' +
            'UPDATE url SET is_deleted = \'TRUE\' WHERE id_domain = (SELECT id_domain FROM domain WHERE name = ?(domain));'
    },
    {
        name: 'delete_url',
        rights: 200,
        sql: 'UPDATE url SET is_deleted = \'TRUE\' WHERE name = ?(url);'
    }
];
exports.domainQueries = domainQueries;
