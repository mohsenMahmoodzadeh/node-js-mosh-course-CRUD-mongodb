//Connecting to mongoDB...
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...',err));
//


/*  
    MongoDB                RDBMS
    Collection             Table
    Document               Record(Row)
*/

/*
    To store objects in MongoDB, we need to define a Mongoose schema first. The
    schema defines the shape of documents in MongoDB.
    
    Schema Types: 
        String
        Number
        Date
        Buffer(for storing binary data)
        Boolean
        ObjectID
        Array
*/

//definig a Schema
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished:Boolean
});
//

// Once we have a schema, we need to compile it into a model. A model is like a class
const Course = mongoose.model('Course',courseSchema);
//

//instantiate an object from a class
const course = new Course({
    name: 'Node.js course',
    author:'mosh',
    tags:['node','backend'],
    isPublished:true
});
//