var express = require('express');
var path = require('path');
var app = express();

var publicPath = path.join(__dirname, '../public')
var indexhtmlPath = path.join(__dirname, '../index.html')
app.use(express.static(publicPath))
app.get('/node_modules/react/dist/react-with-addons.js', function(req, res){
	console.log("sending that nm file");
	res.sendFile(path.join(__dirname, '../node_modules/react/dist/react-with-addons.js'))
})

app.get('/', function(req, res){
	res.sendFile(indexhtmlPath);
})
// app.get('/item', function(req, res){
// 	res.send(../public/json/item.json)
// })

app.listen('65534')

console.log("Hello, world!")

exports = module.exports = app