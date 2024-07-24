const express = require('express')
const app = express();

const menuItem = require('./models/menuItem')
const bodyParser = require('body-parser')
const passport = require('./auth')
app.use(bodyParser.json());
const localAuthMiddleware = passport.authenticate('local' , {session: false}) 

app.get('/' , (req , res)=>{
    res.send('Welcome')
})


const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`)
    next();
}


app.use(logRequest)

const personRoutes = require('./Routes/personRoutes')
app.use('/person', localAuthMiddleware , personRoutes)

const menuRoutes = require('./Routes/menuRoutes')

app.use('/menu',localAuthMiddleware , menuRoutes)





app.listen(3000)