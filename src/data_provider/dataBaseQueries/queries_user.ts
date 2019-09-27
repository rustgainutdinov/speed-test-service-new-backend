import IQueryArray from "../../interfaces/db/IQueryArray";

const userQueries: IQueryArray = [
    {
        name: 'create_user',
        rights: 0,
        sql: 'INSERT INTO "user" (name, email, id_role, pass) VALUES (?(name), ?(email), 1, ?(pass));'
    },
    {
        name: 'get_public_user_data_by_token',
        rights: 0,
        sql: 'SELECT email, id_user, name FROM "user" WHERE token = ?(token);'
    },
    {
        name: 'set_token',
        rights: 0,
        sql: 'UPDATE "user" SET token = ?(token) WHERE email = ?(email);'
    },
    {
        name: 'get_user_pass_by_email',
        rights: 0,
        sql: 'SELECT pass ' +
            ' FROM "user" ' +
            ' WHERE email = ?(email);'
    },
    {
        name: 'get_rights_by_token',
        rights: 0,
        sql: `SELECT r.rights FROM "user"
			INNER JOIN role r on "user".id_role = r.id_role
			WHERE "user".token = ?(token);`
    },
    {
        name: 'user_subscribe_to_domain',
        rights: 0,
        sql: 'INSERT INTO user_has_subscribed_to_domain(id_user, id_domain) ' +
            'VALUES ((SELECT id_user FROM "user" WHERE token = ?(token)), ' +
            '        (SELECT id_domain FROM domain WHERE name = ?(domain)));'
    },
    {
        name: 'get_user_domain_subscriptions',
        rights: 0,
        sql: 'SELECT d.name as domain' +
            'FROM user_has_subscribed_to_domain ' +
            '         INNER JOIN "user" u on user_has_subscribed_to_domain.id_user = u.id_user ' +
            '         INNER JOIN domain d on user_has_subscribed_to_domain.id_domain = d.id_domain ' +
            'WHERE u.token = ?(token);'
    },
    {
        name: 'user_unsubscribe_to_domain',
        rights: 0,
        sql: 'DELETE ' +
            'FROM user_has_subscribed_to_domain ' +
            'WHERE id_user = (SELECT id_user FROM "user" WHERE token = ?(token)) ' +
            '  AND id_domain = (SELECT id_domain FROM domain WHERE name = ?(domain));'
    },
    {
        name: 'get_users_subscriptions',
        rights: 0,
        sql: 'SELECT u2.name as url, u.email ' +
            'FROM user_has_subscribed_to_domain ' +
            '         INNER JOIN "user" u on user_has_subscribed_to_domain.id_user = u.id_user ' +
            '         INNER JOIN domain d on user_has_subscribed_to_domain.id_domain = d.id_domain ' +
            '         INNER JOIN url u2 on d.id_domain = u2.id_domain;'
    }
];

export {userQueries}
