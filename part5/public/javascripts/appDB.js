// $(document).ready( () => {
//     let array = [1];
//     postData(array);
// });

postData = (datapayloadObject) => {
  //console.log(JSON.stringify(datapayloadObject));
    return new Promise( (resolve, reject) => {
    fetch("/postData", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(datapayloadObject)
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
  var stateNames = $('#data_table').DataTable().columns(0).data().toArray()[0];
  var dataPayload = []; //= [$('#userName').val(),stateNames]
  const name = $('#userName').val();

  for(i=0;i<stateNames.length;i++){
    const state = stateNames[i];
    const index = i+1;
    dataPayload.push(`{userName: ${name}, stateName: ${state}, stateRank: ${index}}`)
  }

  dataPayload.forEach(element => {
    console.log("element: " + element);
    // console.log(element[0]);  
    // console.log(element[1]);  
    // console.log(element[2]);  
  });

  postData(dataPayload);
}  