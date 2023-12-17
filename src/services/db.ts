import mysql from 'mysql';

const PROD_URL = process.env.JAWSDB_URL;
const DEV_URL = 'mysql://root:example@127.0.0.1:13306/db';

export const db = mysql.createConnection(PROD_URL || DEV_URL);
db.connect();
