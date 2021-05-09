
const UserModel = require('./model');

// let model = new UserModel()

// model.fullName = 'Thomas Anderson'

// console.log(model.toJSON())
// console.log()
// console.log(model.fullName) 

let model = new UserModel({
    firstName: 'Thomas',
    lastName: 'Anderson'
})

let initials = model.getInitials()

console.log("@@@@",initials)