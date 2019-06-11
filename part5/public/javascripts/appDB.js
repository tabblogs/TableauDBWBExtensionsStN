// $(document).ready( () => {
//     let array = [1];
//     postData(array);
// });

postData = (datapayloadObject) => {
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
  
  postData(stateNames);
  // stateNames.forEach(state => {
  //   console.log(state)
  // });
}  