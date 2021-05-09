const mongoose = require('mongoose');
const validator = require('validator')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

taskSchema.pre(['find', 'findOneAndUpdate'], (next) => {
    console.log("pre method call");
    next()
});
taskSchema.post('find', () => {
    console.log("post method call");
});

let model = new UserModel({
    firstName: 'Thomas',
    lastName: 'Anderson'
})

let initials = model.getInitials()

console.log(initials)


module.exports = mongoose.model('Task', taskSchema)

// schema type:-
// Array
// Boolean
// Date
// Number
// ObjectId
// String

//built-in validation :-
// require:true 
// lowercase
// uppercase
// trim:true 
// minlength
// maxlength
// matchMedia(regEx)