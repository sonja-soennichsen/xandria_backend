const {scrypt} = require('node:crypto');

export function comparePassword( inputPassword:string, dbPassword: string, salt:string) {
    const hashedInputPassword= scrypt(inputPassword, salt, 64, (err:any, derivedKey:any) => {if (err) throw err;});

    return dbPassword == hashedInputPassword ? true : false
}