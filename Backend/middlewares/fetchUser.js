const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

const fetchuser = (req ,res ,next ) => {
    // getting the user from the jwt token and add id to req object 
    
    const token = req.header('auth-token') // taking the token in 'auth-token' header
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, secret) // verifying the token with our signature
        req.userId = data._id
        next() 
    }
    catch (error){
        res.status(401).send({error : "Please please authenticate using a valid token"})
    }
}

module.exports = fetchuser