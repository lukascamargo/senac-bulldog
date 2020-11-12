import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT),
    insecureAuth: true
});


export const queryPromiseGet = (query: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function(error, results, fields) {
            if (error) return reject(error);
            resolve(results);
        })
    })
}

export const queryPromiseSave = (query: any, object: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, object, function(error, results, fields) {
            if (error) return reject(error);
            resolve(results);
        })
    })
}