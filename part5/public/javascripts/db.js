const sql = require('mssql');

// Enter your own credenials in the credentialsExample.js and rename it to credentials.js
const credentials = require("./credentials.js");

exports.query = function(req,res){
    console.log("Running query function.")
    let data =  req.body.data;

    console.log("data: " + data);
    let values = "[";
    // data.forEach(element => {
    //     values += "[" + element[0] + "," + element[1] + "," + element[2] + "]"
    // });
    values += "]"
    console.log("values: " + values);
    
    sql.connect(credentials.config).then(pool => {
        // Query
        return pool.request()
            .query('INSERT INTO ranking.dbo.states (userName, stateName, stateRank) VALUES (\'larry\',\'Texas\',1)'
            //?', values
                //[data.map(item => [item.userName, item.stateName, item.stateRank])]
            ); 
    }).then(result => {
        res.send(result.recordset);
        sql.close();
    }).catch(err => {
        // ... error checks
        console.log("SQL connect error:", err);
        sql.close();
    });
    sql.on('error', err => {
        // ... error handler
        console.log("SQL Error:", err);
        sql.close();
    })
}

module.exports = exports;