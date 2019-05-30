const sql = require('mssql');

const config = {
    user: '*****',
    password: '*****',
    server: '*****.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'sales',
    // connectionTimeout: 1000,
    // requestTimeout: 1000,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
    
}

exports.query= function(req,res){
    console.log("Running query function.")
    let data =  req.body.data;
    sql.connect(config).then(pool => {
        // Query
        return pool.request()
            .query('SELECT * FROM saleslt.customer where customerid = 1'); 
    }).then(result => {
        res.send(result.recordset);
        sql.close();
    }).catch(err => {
        // ... error checks
        console.log("SQL connect error:", err);
    });
    sql.on('error', err => {
        // ... error handler
        console.log("SQL Error:", err);
        sql.close();
    })
}

module.exports = exports;
