var express = require('express')
var app = express()
var path = require('path')

var css = path.join(__dirname, 'components/css')
var img = path.join(__dirname, 'components/img')
var templates = path.join(__dirname, 'src/templates')

// Loads the static file into the app
app.use('/',express.static(css))
app.use('/',express.static(img))


app.get('/', (req, res)=>{
    res.sendFile(path.join(templates + '/index.html'))
})

app.get('/index.html', (req, res)=>{
    res.sendFile(path.join(templates + '/index.html'))
})

app.get('/newtask.html', (req, res)=>{
    res.sendFile(path.join(templates + '/newtask.html'))
})

app.get('/about.html', (req, res)=>{
    res.sendFile(path.join(templates + '/about.html'))
})

app.get('/currenttask.html', (req, res)=>{
    res.sendFile(path.join(templates + '/currenttask.html'))
})


app.listen(3000)
console.log("Listening in port 3000")