var express = require('express')
var app = express()
var path = require('path')
var dbScripts = require('./src/js/Database.js')
var bodyParser = require('body-parser');

var css = path.join(__dirname, 'components/css')
var img = path.join(__dirname, 'components/img')
var templates = path.join(__dirname, 'src/templates')
var assets = path.join(__dirname, 'assets')


// Loads the static file into the app
app.use('/', express.static(css))
app.use('/', express.static(img))
app.use('/', express.static(assets))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
	res.sendFile(path.join(templates + '/index.html'))
})

app.get('/index.html', (req, res) => {
	res.sendFile(path.join(templates + '/index.html'))
})

app.get('/newtask.html', (req, res) => {
	res.sendFile(path.join(templates + '/newtask.html'))
})

app.post('/newtask.html', (req, res) => {
	var title = req.body.tasktitle
	var description = req.body.description
	var date = req.body.date
	dbScripts.insert(title, description, false)
	res.sendFile(path.join(templates + '/newtask.html'))
})

app.get('/about.html', (req, res) => {
	res.sendFile(path.join(templates + '/about.html'))
})

app.get('/currenttask.html', (req, res) => {
	var MongoClient = require('mongodb').MongoClient
	var TaskList = []
	var url = 'mongodb://localhost:27017'
	MongoClient.connect(url, function (err, db) {
		var dbo = db.db('Taskmanager')
		var cursor = dbo.collection('tasks').find()
		if (err) throw err
		cursor.forEach(function (task, err) {
			if (err) throw err
			TaskList.push(task)
			console.log(task)
		}, function () {
			db.close()
			res.render(path.join(templates + '/currenttask'), { tasks: TaskList })
		})
	})
})

app.post('/currenttask.html', (req, res) => {
	id = req.query.q
	dbScripts.delete(id)
	console.log(id)
	res.redirect('/currenttask.html')
})


app.listen(3000)

console.log("Listening in port 3000")
