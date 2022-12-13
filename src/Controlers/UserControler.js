const UserModel = require("../Models/user.js");
const { isValid, isValidBody, isValidEmail, isValidString,isValidObjectId } = require("../validation/validation.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
module.exports.createNote = async (req, res) => {
    try {

        // ..........................................BODY VALIDATION.........................................................
        if (isValidBody(req.body)) {
            return res.status(400).send({ status: false, msg: "body should not be empty" })
        }
        // ..........................................NAME VALIDATION.........................................................

        let { name, email, password } = req.body
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is not be empty" })
        }

        if (isValid(name)) {
            return res.status(400).send({
                status: false, msg: "name should not be empty"
            })
        }
        if (isValidString(name)) {
            return res.status(404).send({ staus: false, msg: "name should be in string format" })
        }


        // ..........................................EMAIL VALIDATION.........................................................

        if (!email) {
            return res.status(400).send({
                status: false, msg: "Email should not be empty"
            })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "email ID  should be  valid" })

        }

        let douplicateEmail = await UserModel.findOne({email}) //DUPLICATE EMAIL ID CHECK
        if (douplicateEmail) {
            return res.status(400).send({ status: false, msg: "email id is already present" })
        }
        // ..........................................PASSWORD VALIDATION.........................................................

        if (!password) { res.status(400).send({ status: false, msg: "password is mandatory" }) }
        req.body.password = await bcrypt.hash(password, 10);


        // ..........................................DATA CREATION .........................................................

        let data = await UserModel.create(req.body);

        // ..........................................RESPOSNE VALIDATION.........................................................

        return res.status(201).send({ status: true, msg: "user is sucessfully register", data: data })
    }
    // ..........................................CATCH........................................................

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        // ..........................................email VALIDATION.........................................................

        if (!email) {
            return res.status(400).send({ status: false, msg: "email should be present in body" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "email should be valid " })
        }
        let user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                status: false, msg: "email id is not register"
            })
        }
        // console.log(user)
        let actualPassword = await bcrypt.compare(password, user.password)
        if (!password) {
            return res.status(400).send({ status: false, msg: "email should be present in body" })
        }
        if (isValid(password)) {
            return res.status.send({ status: false, msg: "password must be require" })
        }
      
        
        if (!actualPassword) {
            return res.status(400).send({ status: false, msg: "password is incorrect" })
        }
        let token = jwt.sign({
            "Userid": user._id,

        },"wtf")
        return res.status(201).send({ status: true, msg: "login sucessfull", data: { userid: user.id, token: token } })


    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}