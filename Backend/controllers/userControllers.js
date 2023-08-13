const { body, validationResult } = require('express-validator')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    return token
};

const signupValidator = [
    body('name').isLength({ min: 6 }).withMessage('Name must be at least 6 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // if the email aleady exists then return the message
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        // creating hash for the password
        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(req.body.password, salt)
        req.body.password = securePass

        // creating the new user and sending the authtoken as well. 
        const newUser = await userModel.create(req.body)
        res.status(201).json({ success: true })
    } catch(error) {
        res.status(500).json({message: error.message})
    }

}   

const loginValidators = [
    body('email').isEmail(),
    body('password').exists()
]

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // check if the user with the given email exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials, pleae check your email and password' });
        }

        // generate and return an authentication token
        const authToken = generateAuthToken(user);
        res.status(200).json({ success: true, authToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        // fetch the user from the database using the user ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // return the user details
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTasks = async (req, res) => {
    try{
        const userId = req.userId
        const updatedTasks = {tasks: req.body.tasks}
        await userModel.findByIdAndUpdate(userId, {$set: updatedTasks}, {new: true})
        const updatedUser = await userModel.findById(userId)
        res.status(200).json({success: true, updatedUser})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    signupValidator, signup, loginValidators, login, getUser, updateTasks
}