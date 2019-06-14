const sql = require('mssql');

// Enter your own credenials in the credentialsExample.js and rename it to credentials.js
const credentials = require("./credentials.js");

exports.insertData = (req, res)=>{  
    let column = [];
    let values = [];
    
    let data = req.body.data;
  
    let jsondata = JSON.stringify(data);
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
  
    //console.log(insertQuery);
  
    //send the insertQuery
    new sql.ConnectionPool(credentials.config)
      .connect()
      .then((pool)=> {
        return pool.request().query(insertQuery);
      })
      .then((result)=> {
        console.log(result);
        sql.close();
      })
      .catch((err)=> {
        if (err) throw err;
        sql.close();
      });
    res.end(); 
  };
  
  function addQuote(val) {return val.length ? "'" + val.join("','") + "'" : "";
}

module.exports = exports;