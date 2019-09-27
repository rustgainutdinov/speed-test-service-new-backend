import User from "../../classes/User";

export default interface IDataBaseProvider {
	execute(query: string, data: object, onExecute: Function, onError: Function, user?: User): void;
}
