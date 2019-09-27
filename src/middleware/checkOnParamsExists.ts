import IQueryData from "../interfaces/db/IQueryData";

function checkOnParamsExist(data: IQueryData, paramsList: Array<string>): void {
    paramsList.forEach((param: string) => {
        if (!data[param]) {
            throw new Error('Param ' + param + ' is required')
        }
    });
}

export default checkOnParamsExist