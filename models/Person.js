const mongoose = require('mongoose')
 const bcrypt = require('bcrypt')
const mongUrl = 'mongodb://localhost:27017/tut'
mongoose.connect(mongUrl)

const personSchema = mongoose.Schema({
    name: String,
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    }

})

personSchema.pre('save' , async (next)=>{

    const person = this ;
    if(!person.isModified('password')){
       return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(person.password , salt)
        person.password = hashedPassword

        next()
    } catch (error) {
        return next(error)
    }
})




module.exports = mongoose.model('Person', personSchema)

