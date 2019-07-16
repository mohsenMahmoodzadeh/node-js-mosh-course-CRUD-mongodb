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

//Saving a document
async function createCourse() {
    //instantiate an object from a class
    const course = new Course({
        name: 'Angular course',
        author:'mosh',
        tags:['angular','frontend'],
        isPublished:true
    });
    //
const result = await course.save();
console.log(result);
}
//

//retrieving a document
async function getCourses() {
    /* Logical Query Operators
        or
        and
    */

    /*Comparison Query Operators
        eq (equal)
        ne (not equal)
        gt (greater than)
        gte(greater than or equal to)
        lt (less than)
        lte(less than or equal to)
        in
        nin(not in)
    */
   const pageNumber = 2;
   const pageSize = 10;

    const courses = await Course
        .find({author : 'mosh' , isPublished:true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1}) //1 == ascending order, -1 == descending order
        .select({name: 1 , tags: 1});
    console.log(courses); 
}

async function updateCourse(id) {
    /* Approch: Update first : Sometimes we just wanna update a document(s) directly in the database.
    1.update directly
    2.optionally: get the updated document
    */

    //1.
    const result = await Course.update({_id:id}, {
        $set: {
            author: 'Mosh',
            isPublished:false
        }
    });
    console.log(result);

    //2.
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Jack',
    //         isPublished: true
    //     }
    // },{new:true}); //the 3rd argument is used for visiting updated data
    // console.log(course);

    
}

updateCourse('5d2b25da57f1f123c0e87944');
//