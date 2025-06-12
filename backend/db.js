const sql = require('mssql');

const config = {
  user: 'root',
  password: '123',
  server: 'localhost',
  database: 'QA',
  "Integrated Security" : true ,
  options: {
     trustedConnection: true,
    trustServerCertificate: true,
  },
  driver:'msnodesqlv8'
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch(err => console.log("Database Connection Failed! ", err));

module.exports = {
  sql, poolPromise , config
};
