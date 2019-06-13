const sql = require('mssql');

// Enter your own credenials in the credentialsExample.js and rename it to credentials.js
const credentials = require("./credentials.js");

exports.query = function(req,res){
    console.log("Running query function.")
    console.log("Req.body: ", req.body);

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
};

exports.insertData = function(req, res){
    console.log("Running insertData function");
    console.log("Req.body: ", req.body);
    
    let column = [];
    let values = [];
    
    let data = req.body.data;
    console.log("Data in insertData:", data)
  
    JSON.parse(data, (key, value) => {
      //push into an array so we can use it the query
      column.push(key.trim());
      values.push(value);
    });
  
    columnArray = column.filter(function(n) {
      return n != "";
    });
  
    valueArray = values.filter(function(n) {
      if (Object.keys(n).length !== 0) {
        return `'${n}'`;
      }
    });
  
    valueArray = addQuote(valueArray);
  
    //let newArr = arr.toString().replace(/,[0-9]/g, "");
  
    let insertQuery = `INSERT INTO ${
      ranking.dbo.states
    } (${columnArray}) VALUES (${arr3});`;
  
    console.log(insertQuery);
  
    //send the insertQuery
    new sql.ConnectionPool(auth)
      .connect()
      .then(function(pool) {
        return pool.request().query(insertQuery);
      })
      .then(function(result) {
        console.log(result);
        sql.close();
      })
      .catch(function(err) {
        if (err) throw err;
        sql.close();
      });
    res.end();
  };
  
  function addQuote(val) {return val.length ? "'" + val.join("','") + "'" : "";
}

module.exports = exports;