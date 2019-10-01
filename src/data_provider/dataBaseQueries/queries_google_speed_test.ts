import IQueryArray from "../../interfaces/db/IQueryArray";

const googleSpeedTestQueries: IQueryArray = [
    {
        name: 'add_new_test',
        rights: 0,
        sql: `INSERT INTO test (id_test, date_time)
					VALUES (?(idTest), now());`
    },
];

export default googleSpeedTestQueries
