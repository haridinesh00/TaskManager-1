exports.createDB = () => {
    var client = require('mongodb').MongoClient
    var url = 'mongodb://localhost:27017/Taskmanager'

    client.connect(url, (err, db) => {
        if (err) throw err
        db.close()
    })
}

exports.collection = () => {
    var client = require('mongodb').MongoClient
    var url = 'mongodb://localhost:27017/'
    client.connect(url, (err, db) => {
        if (err){
            createDB()
        }
        var dbo = db.db('Taskmanager')
        dbo.createCollection("tasks", (err, res) => {
            if(err) throw err
        })
    })
}

exports.insert = (tId, tDesc, tDate, tCompletion) => {
    var client = require('mongodb').MongoClient
    var url = 'mongodb://localhost:27017/'
    var obj = { Id : tId, Desc : tDesc, Date: tDate, Completion : tCompletion }
    client.connect(url, (err, db) => {
        if(err){
            throw err
        }
        var dbo = db.db('Taskmanager')
        dbo.collection('tasks').insertOne(obj, (err, res) => {
            if (err) throw err
            db.close()
        })
    })
}


exports.delete = (id) => {
    var ObjectId = require('mongodb').ObjectID;
    var client = require('mongodb').MongoClient
    var url = 'mongodb://localhost:27017'
    client.connect(url, (err, db) => {
        if(err) throw err
        var dbo = db.db('Taskmanager')
        query = {_id : new ObjectId(id)}
        dbo.collection('tasks').deleteOne(query, function(err, obj){
            if(err) throw err
            db.close()
        })
    })
}