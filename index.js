// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  let checker = Number(date);
  console.log(date);
  
    if (!isNaN(checker)) {
      const utcDate = new Date(checker).toUTCString();

      res.json({ unix: checker, utc: utcDate });
    } else {
      const utcTimestamp = new Date(date).getTime();
      const utcDate = new Date(date).toUTCString();
      if (isNaN(utcTimestamp)) {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: utcTimestamp, utc: utcDate });
      }
    }
  
});
app.get("/api/",function(req,res){
    const utcDate = new Date().toUTCString();
    const utcTimestamp = new Date().getTime();
    res.json({ unix: utcTimestamp, utc: utcDate });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
