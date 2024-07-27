const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongUrl = 'mongodb://localhost:27017/tut'
mongoose.connect(mongUrl)

const personSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
})

personSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const ismatch = await bcrypt.compare(candidatePassword, this.password);
    return ismatch;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = mongoose.model('Person', personSchema)


