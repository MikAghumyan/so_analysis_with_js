var express = require("express");
var app = express();
var server = require("http").Server(app);

app.use(express.static("."));
app.get("/", function(req, res) {
  res.redirect("./questions.json");
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log("port: " + port);
