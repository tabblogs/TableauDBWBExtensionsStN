const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('.'));

//start the server
app.listen(port, function() {
    console.log("Our server is running on " + port);
});