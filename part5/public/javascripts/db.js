const sql = require('mssql');

// Enter your own credenials in the credentialsExample.js and rename it to credentials.js
const credentials = require("./credentials.js");

exports.insertData = (req, res)=>{  
    let column = [];
    let values = [];
    
    let data = req.body.data;
    console.log("Data: ",data)
  
    let jsondata = JSON.stringify(data);
    console.log("JSON data:", jsondata);

    JSON.parse(jsondata, (key,value)=>{
        switch(key){
            case "userName":
                values += "('"+value+"',"
                break;
            case "stateName":
                values += "'"+value+"',"
                break;
            case "stateRank":
                values += "'"+value+"'),"
                break;
        }
    });

    valueArray = values.substr(0,values.length-1);
  
    let insertQuery = `INSERT INTO ranking.dbo.states (userName,stateName,stateRank) VALUES ${valueArray};`;
    console.log(insertQuery);
    //INSERT INTO ranking.dbo.states (userName,stateName,stateRank) VALUES ('LC','Colorado','1'),('LC','Tennessee','2'),('LC','Texas','3');
  
    //send the insertQuery
    new sql.ConnectionPool(credentials.config)
      .connect()
      .then((pool)=> {
        return pool.request().query(insertQuery);
      })
      .then((result)=> {
        console.log("Result: ",result);
        sql.close();
      })
      .catch((err)=> {
        console.log("Error caught in db transaction.")
        if (err) throw err;
        sql.close();
      });
    res.end(); 
};

module.exports = exports;