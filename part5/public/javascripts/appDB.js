// $(document).ready( () => {
    
//     postData(array);
// });

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
  console.log("Running postRank")
  var stateNames = $('#data_table').DataTable().columns(0).data().toArray()[0]; //push the first column of the html table into an array
  var postObject = {};
  var insertData = []; //= [$('#userName').val(),stateNames]
  const name = $('#userName').val();

  for(i=0;i<stateNames.length;i++){
    const state = stateNames[i];
    const index = i+1;
    insertData.push({userName:name});
    insertData.push({stateName:state});
    insertData.push({stateRank:index});
  }

  console.log("insertData in postRank: ", insertData);

  postObject.data = insertData;
  postData(JSON.stringify(postObject));
  //let post = JSON.stringify(insertData);
  // let post = [{"username": "Larry", "stateName": "Texas", "stateRank": "1"}];

  // console.log("Post in postRank():",post);
  // postData(post);
  // let foo = [];
  // foo.push({userName: Larry});
  // console.log(foo);
  // postData(JSON.stringify(foo));
};

function postRank2(){
  // get the input values
  // let input = document.querySelectorAll("#data_table");
  let input = $('#data_table').DataTable().columns(0).data().toArray()[0];
  console.log("Input from postrank2: ", input);

  Array.from(input).forEach(function(e) {
    if (e.value !== "") {
      console.log("E.value from postRank2 foreach: ", e.value);
      stateList.push({ [e.id]: e.value });
    }
  });
  console.log(stateList);
  let data = JSON.stringify(stateList);

  postData(data);
}