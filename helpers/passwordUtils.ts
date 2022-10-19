const {scrypt} = require('node:crypto');

export function compare( inputPassword:string, dbPassword: string, salt:string) {
    return dbPassword == hash(inputPassword, salt) ? true : false
}

export function hash( inputPassword:string, salt:string) {
    const hashedInputPassword= scrypt(inputPassword, salt, 64, (err:any, derivedKey:any) => {if (err) throw err;});

    return hashedInputPassword
}