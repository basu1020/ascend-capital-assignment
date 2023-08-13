// necessary imports
const express = require('express')
const app = express()
const cors = require('cors')
const dbConnect = require('./config/dbConnect')
const userModel = require('./models/userModel')
const {signupValidator, signup, loginValidators, login, getUser, updateTasks} = require('./controllers/userControllers')
const fetchuser = require('./middlewares/fetchUser')


// configurations
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 5000
dbConnect()

app.get('/', async (req, res) => {
    res.status(200).json({message: "Hi, this is a backend created with expressjs and mongodb"})
})

app.post('/signup', signupValidator, signup)

app.post('/login', loginValidators, login)

app.post('/get-user', fetchuser, getUser)

app.post('/update-tasks', fetchuser, updateTasks)

app.listen(port, () => {
    console.log(`live on ${port}`)
})
