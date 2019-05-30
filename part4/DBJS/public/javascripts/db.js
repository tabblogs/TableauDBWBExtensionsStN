const sql = require('mssql');

// Enter your own credenials in the credentialsExample.js and rename it to credentials.js
const credentials = require("./credentials.js");

exports.query= function(req,res){
    console.log("Running query function.")
    let data =  req.body.data;
    sql.connect(credentials.config).then(pool => {
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
