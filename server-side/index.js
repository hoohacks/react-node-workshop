const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
var http = require('http').createServer(app);
var path = require("path");


app.use(express.static('public'));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var member_names = ["sindhu", "ankisha", "rithik", "manasi"]

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

//get request: communication between front end and back end
//just to display what the html file shows
//returns back the webpage
app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
});

//post: used send data to a server 
//this method is updating what the search requests are and it sends back the search responses to the user
app.post('/search', function (req, res) {
    // request example
    // { "search_request": **keyword here**}
    // if the member's name contains the keyword, return it
    // "s" --> "Sindhu", "Ankisha", "Manasi" 
    // "si" --> "Sindhu", "Manasi" NOT "Ankisha"
    const keyword = req.body.searchRequest;

    const answers = member_names.map(name => { //separates each element in the array (member_names) and checks if each one includes the keyword
        if (name.includes(keyword)){ 
            return name;
        }
        return false;
    }).filter(Boolean); //filter out all the 'false' reponses in the array answers

    res.json({
        "search_responses": answers //within the json object there is a property called search_responses and the value is answers 
    });
});