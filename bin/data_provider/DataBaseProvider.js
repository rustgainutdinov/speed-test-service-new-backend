"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dataBaseQueries_1 = require("./dataBaseQueries");
const queryParamRegExp_1 = require("../constants/db/queryParamRegExp");
class DataBaseProvider {
    constructor(config) {
        const client = new pg_1.Pool(config);
        client.connect((err) => {
            if (err)
                console.log('Connection to database error');
            else
                console.log('Success connection to database');
        });
        this.DataBaseClient = client;
        DataBaseProvider.dataBaseProvider = this;
    }
    static getDBInstance() {
        return DataBaseProvider.dataBaseProvider;
    }
    execute(queryName, data, onExecute, onError, user) {
        let query;
        try {
            query = this.getQueryByName(queryName);
        }
        catch (e) {
            onError(e);
            return;
        }
        const text = this.insertDataIntoSql(query.sql, data);
        this.checkUserRights(query.rights, user, () => {
            this.DataBaseClient.query({ text }, (err, result) => {
                if (err) {
                    onError(err);
                }
                else {
                    onExecute(result.rows);
                }
            });
        }, onError);
    }
    ;
    getQueryByName(name) {
        let searchQuery;
        dataBaseQueries_1.default.forEach((query) => {
            if (query.name === name) {
                searchQuery = query;
            }
        });
        if (!searchQuery) {
            throw new Error('Query is not found');
        }
        return searchQuery;
    }
    checkUserRights(queryRights, user, onSuccess, onError) {
        if (queryRights > 0) {
            if (!user) {
                onError(new Error('User is not found'));
            }
            else {
                user.getRights((userRights) => {
                    if (userRights >= queryRights) {
                        onSuccess();
                    }
                    else {
                        onError(new Error('User has no rights to do it'));
                    }
                }, onError);
            }
        }
        else {
            onSuccess();
        }
    }
    insertDataIntoSql(sql, data) {
        sql = this.replaceListOfObjects(sql, data);
        sql = this.replaceListOfParams(sql, data);
        sql = this.replaceStringWithoutQuotes(sql, data);
        sql = this.replaceParam(sql, data);
        return sql;
    }
    replaceParam(sql, data) {
        return sql.replace(queryParamRegExp_1.REPLACED_ITEM_REG_EXP, (_, id) => {
            return data[id] ? `'` + data[id] + `'` : 'NULL';
        });
    }
    ;
    replaceListOfObjects(sql, data) {
        return sql.replace(queryParamRegExp_1.REPLACED_ARRAY_OF_OBJECTS_REG_EXP, (_, replacementString) => {
            let arrName = '';
            replacementString = replacementString.replace(queryParamRegExp_1.REPLACED_ARRAY_OF_OBJECTS_NAME_REG_EXP, (_, dataId) => {
                arrName = dataId;
                return '';
            });
            let result = '';
            data[arrName].forEach((item, i) => {
                if (i === 0) {
                    result += '';
                }
                else {
                    result += ',';
                }
                result += '(' + this.replaceParam(replacementString, item) + ')';
            });
            return result;
        });
    }
    replaceListOfParams(sql, data) {
        return sql.replace(queryParamRegExp_1.REPLACED_LIST_OF_PARAMS_REG_EXP, (_, replacementString) => {
            let arrName = '';
            replacementString.replace(queryParamRegExp_1.REPLACED_LIST_OF_PARAMS_NAME_REG_EXP, (_, dataId) => {
                arrName = dataId;
                return '';
            });
            return `('` + data[arrName].join(`', '`) + `')`;
        });
    }
    replaceStringWithoutQuotes(sql, data) {
        return sql.replace(queryParamRegExp_1.REPLACED_STRING_WITHOUT_QUOTES_REG_EXP, (_, name) => {
            return data[name];
        });
    }
}
exports.default = DataBaseProvider;
