import * as bcrypt from 'bcrypt';

function cryptPass(pass: string): string {
    let hash: string;
    try {
        hash = bcrypt.hashSync(pass, 10)
    } catch (e) {
        throw e
    }
    return hash;
}

export default cryptPass