const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

  const fromc = req.body.from;
  const toc = req.body.to;
  const amountc = req.body.amount;

  const url = "https://v6.exchangerate-api.com/v6/355589be05339d382e553a65/pair/" + fromc + "/" + toc + "/" + amountc;

  https.get(url, function(response) {
    var data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      const currencyConverter = JSON.parse(data);
      const convertedRate = currencyConverter.conversion_result;
      res.render("list", { output : convertedRate, number : amountc, value1 : fromc, value2 : toc });
    });
  });
});



app.listen(3000);
