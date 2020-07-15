import * as mysql from 'mysql'

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'administrator',
//   password: '123456',
//   database: 'database name'
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

const connection = mysql.createConnection('mysql://uetjp6on2r17c6xj:9W1xWttstzAMQD1W0OV2@brxbydgw90znviqrsnyl-mysql.services.clever-cloud.com:3306/brxbydgw90znviqrsnyl')

export default connection;