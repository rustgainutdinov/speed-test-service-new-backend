import * as bcrypt from 'bcrypt';

function comparePass(pass: string, hash: string): boolean {
    let comparedResult: boolean;
    try {
        comparedResult = bcrypt.compareSync(pass, hash);
    } catch (e) {
        throw e
    }
    return comparedResult
}

export default comparePass