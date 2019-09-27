import User from "../classes/User";
import IDataBaseConfig from '../interfaces/db/IDataBaseConfig';
import IQuery from "../interfaces/db/IQuery";
import IQueryData from '../interfaces/db/IQueryData'
import IDataBaseProvider from "../interfaces/db/IDataBaseProvider";
import {Pool, ResultBuilder} from "pg";
import queries from './dataBaseQueries';
import {
    REPLACED_ITEM_REG_EXP,
    REPLACED_ARRAY_OF_OBJECTS_REG_EXP,
    REPLACED_ARRAY_OF_OBJECTS_NAME_REG_EXP,
    REPLACED_LIST_OF_PARAMS_REG_EXP,
    REPLACED_LIST_OF_PARAMS_NAME_REG_EXP,
    REPLACED_STRING_WITHOUT_QUOTES_REG_EXP
} from "../constants/db/queryParamRegExp";

export default class DataBaseProvider implements IDataBaseProvider {
    private static dataBaseProvider: DataBaseProvider;
    private readonly DataBaseClient: any;

    public static getDBInstance(): DataBaseProvider {
        return DataBaseProvider.dataBaseProvider;
    }

    constructor(config: IDataBaseConfig) {
        const client: Pool = new Pool(config);
        client.connect((err: Error) => {
            if (err) console.log('Connection to database error');
            else console.log('Success connection to database');
        });
        this.DataBaseClient = client;
        DataBaseProvider.dataBaseProvider = this;
    }

    execute(queryName: string, data: IQueryData, onExecute: Function, onError: Function, user?: User) {
        let query: IQuery;
        try {
            query = this.getQueryByName(queryName)
        } catch (e) {
            onError(e);
            return
        }
        const text: string = this.insertDataIntoSql(query.sql, data);
        this.checkUserRights(query.rights, user, () => {
            this.DataBaseClient.query(
                {text},
                (err: Error, result: ResultBuilder) => {
                    if (err) {
                        onError(err);
                    } else {
                        onExecute(result.rows);
                    }
                })
        }, onError);
    };

    private getQueryByName(name: string): IQuery {
        let searchQuery: IQuery;
        queries.forEach((query: IQuery) => {
            if (query.name === name) {
                searchQuery = query;
            }
        });
        if (!searchQuery) {
            throw new Error('Query is not found');
        }
        return searchQuery
    }

    private checkUserRights(queryRights: number, user: User, onSuccess: Function, onError: Function): void {
        if (queryRights > 0) {
            if (!user) {
                onError(new Error('User is not found'));
            } else {
                user.getRights((userRights: number) => {
                    if (userRights >= queryRights) {
                        onSuccess();
                    } else {
                        onError(new Error('User has no rights to do it'))
                    }
                }, onError);
            }
        } else {
            onSuccess();
        }
    }

    private insertDataIntoSql(sql: string, data: IQueryData): string {
        sql = this.replaceListOfObjects(sql, data);
        sql = this.replaceListOfParams(sql, data);
        sql = this.replaceStringWithoutQuotes(sql, data);
        sql = this.replaceParam(sql, data);
        return sql;
    }

    private replaceParam(sql: string, data: IQueryData): string {
        return sql.replace(REPLACED_ITEM_REG_EXP, (_: any, id: string): string => {
            return data[id] ? `'` + data[id] + `'` : 'NULL'
        });
    };

    private replaceListOfObjects(sql: string, data: IQueryData): string {
        return sql.replace(REPLACED_ARRAY_OF_OBJECTS_REG_EXP, (_: any, replacementString: string): string => {
            let arrName: string = '';
            replacementString = replacementString.replace(REPLACED_ARRAY_OF_OBJECTS_NAME_REG_EXP, (_: any, dataId: string): string => {
                arrName = dataId;
                return ''
            });
            let result: string = '';
            data[arrName].forEach((item: Array<any>, i: number) => {
                if (i === 0) {
                    result += ''
                } else {
                    result += ','
                }
                result += '(' + this.replaceParam(replacementString, item) + ')';
            });
            return result
        });
    }

    private replaceListOfParams(sql: string, data: IQueryData): string {
        return sql.replace(REPLACED_LIST_OF_PARAMS_REG_EXP, (_: any, replacementString: string): string => {
            let arrName: string = '';
            replacementString.replace(REPLACED_LIST_OF_PARAMS_NAME_REG_EXP, (_: any, dataId: string): string => {
                arrName = dataId;
                return ''
            });
            return `('` + data[arrName].join(`', '`) + `')`;
        });
    }

    private replaceStringWithoutQuotes(sql: string, data: IQueryData): string {
        return sql.replace(REPLACED_STRING_WITHOUT_QUOTES_REG_EXP, (_: any, name: string): string => {
            return data[name];
        });
    }

}
