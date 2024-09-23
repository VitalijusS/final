import mysql from 'mysql2/promise';
let connection = null;

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'turizmas',
};
try {
    connection = await mysql.createConnection(dbOptions)

} catch (error) {
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
}

setInterval(async () => {
    if (connection?.connection?._fatalError !== null) {
        try {
            connection = await mysql.createConnection(dbOptions)
        } catch (error) {
            // console.log(error);
        }
    }
}, 5000);

export default connection;