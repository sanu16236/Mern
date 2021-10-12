const express = require('express');
const user = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
require('../db/conn');
const User = require('../model/userSchema');
router.get('/', (req, res) => {
    res.send(`hello world from router file`);
});

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password mismatched" });

        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            const response = await user.save();

            if (response) {
                res.status(201).json({ message: "user registered successfully" });
            } else {
                res.status(500).json({ message: "Failed to registered" });
            }
        }


    } catch (err) {
        console.log(err);
    }

});

router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ err: "Please fill all fields" });
        }

        const userLogin = await user.findOne({ email: email });
        if (!userLogin) {
            return res.status(400).json({ error: "Invalid credintial" });
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true

        });

        console.log(token);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credential" });
        } else {
            res.status(200).json({ message: "signin successful" });
        }
    } catch (err) {
        console.log(err);
    }

});

// about us page middleware

router.get('/about', authenticate, (req, res) => {
    // console.log('hello about page');    

    res.send(req.rootUser);

});

// getdata
router.get('/getdata', authenticate, (req, res) => {
    // console.log('hello about page');

    res.send(req.rootUser);
});

// contact form data
router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "please fill the form" });

        }

        const userContact = await User.findOne({ _id: req.userId });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user message saved successfully" });
        }

    } catch (err) {
        console.log(err);
    }

});

router.get('/logout', (req, res) => {
    // console.log('hello from logout page');    
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('logout');

});
module.exports = router;