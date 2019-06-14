let stateList = [];

postData = (insertData) => {
  console.log("Running postData");
  console.log("insertData: ",insertData);
  
    return new Promise( (resolve, reject) => {
    fetch("/postData", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: insertData
    })
      .then(function(response) {
        const r = response.json();
        return r;
      })
      .then(function(myJson) {
        $('#result').text(JSON.stringify(myJson));
        return(myJson);
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
      });
    });
}

function postRank(){
  var stateNames = $('#data_table').DataTable().columns(0).data().toArray()[0]; //push the first column of the html table into an array
  var postObject = {};
  var insertData = []; 
  const name = $('#userName').val();

  for(i=0;i<stateNames.length;i++){
    const state = stateNames[i];
    const index = i+1;
    insertData.push({userName:name});
    insertData.push({stateName:state});
    insertData.push({stateRank:index});
  }

  postObject.data = insertData;
  postData(JSON.stringify(postObject));
};