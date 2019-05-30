$(document).ready( () => {
    let array = [1];
    fetchData(array);
});

fetchData = (datapayloadObject) => {
    return new Promise( (resolve, reject) => {
    fetch("/getData", {
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