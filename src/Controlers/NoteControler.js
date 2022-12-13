const notesModel = require("../Models/login.js");
const UserModel = require("../Models/user")
const Notes = require("../Models/note.js")
const { isValid, isValidString, isValidBody, isValidObjectId } = require("../validation/validation.js")
const bcrypt = require("bcrypt");
const { populate } = require("../Models/login.js");
const User = require("../Models/user");
const ObjectId = require('mongoose').Types.ObjectId;




module.exports.createNote = async (req, res) => {
    try {

        if (isValidBody(req.body)) {
            return res.status(400).send({ status: false, msg: "body should not be empty" })
        }

        let { tittle, description, tag, isdelete } = req.body

        //''''''''''''''''''''''''''''''''''''''''''''''''''''' User id Validation''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        let userid = req.body.userid

        let validObject = isValidObjectId(userid)
        //   console.log(validObject)
        if (validObject === false) {
            return res.status(400).send({ status: false, msg: "Invalid user Id" })
        }
        let userId = await UserModel.findOne({ _id: userid })
        // console.log(userId)
        if (userId === null || undefined) {
            return res.status(400).send({ status: false, msg: "user Id is not present " })
        }
        if (!userid) { return res.status(400).send({ status: false, msg: `$(userid) userid is invalid ` }) }


        //'''''''''''''''''''''''''''''''''''''''''''''''''''''Tittle Validation''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (!tittle) { return res.status(400).send("title shold be present") };
        if (isValidString(tittle)) { return res.status(400).send("title must be in string format") }
        if (isValid(tittle)) { return res.status(400).send("tittl must not be empty or undefined or null") }
        let duplicateTittle = await Notes.findOne({ tittle })
        // console.log(duplicateTittle)
        if (duplicateTittle) { return res.status(400).send({ status: false, message: " Tittle should be unique" }) }

        //'''''''''''''''''''''''''''''''''''''''''''''''''''''Description Validation''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (!description) { return res.status(400).send("description shold be present") };
        if (isValidString(description)) { return res.status(400).send("decription must be in string format") }
        if (isValid(description)) { return res.status(400).send("description must not be empty or undefined or null") }

        //''''''''''''''''''''''''''''''''''''''''''''''''''''' tag Validation''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        if (isValidString(tag)) { return res.status(400).send("tag must be in string format") }


        const Data = {

            tittle,
            description,
            tag: tag,
            userid: userId,
            isdelete: isdelete
        };

        Notes.create(Data);
        return res.status(201).send({
            status: true,
            message: `notes  created successfully`,
            data: Data
        });




    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



exports.getnotesbyId = async (req, res) => {
    try {
        let id = req.params.id;

        let validObject = isValidObjectId(id)
        // console.log(validObject)
        if (validObject === false) {
            return res.status(400).send({ status: false, msg: "Invalid ObjectId" })
        }

        let serachData = await Notes.findOne({ _id: id })
        console.log(serachData)
        if (serachData.isdelete === true) { return res.status(404).send({ status: false, msg: " the id that you resquest is not present" }) }
        if (!serachData) { return res.status(400).send({ stutus: false, msg: "bad request" }) }
        else {
            return res.status(200).send({ status: true, data: serachData })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




exports.upadate = async (req, res) => {
    try {
        if (isValidBody(req.body)) {
            return res.status(400).send({ status: false, msg: "body should not be empty" })
        }

        let id = req.params.id;
        let validObject = isValidObjectId(id)
        // console.log(validObject)
        if (validObject === false) {
            return res.status(400).send({ status: false, msg: "Invalid ObjectId" })
        }

        let serachData = await Notes.findById({ _id: id })
        if (serachData.isdelete === true) { return res.status(404).send({ status: false, msg: " the id that you resquest is not present" }) }
        if (!serachData) { return res.status(400).send({ stutus: false, msg: "bad request" }) }
        if (serachData.isdelete === true) {
            return res.status(404).send({ status: false, msg: "no such data exist in the database it may be deleted or not created so far" })
        }
        let { tittle, description } = req.body;
let duplicateTittle=await Notes.findOne({tittle})
if(duplicateTittle){
    return res.status(400).send({status:false,msg:"this tittle is already exist do new for updation"})
}

        if (isValidString(tittle)) { return res.status(400).send("title must be in string format") }

        if (isValidString(description)) { return res.status(400).send("decription must be in string format") }


        let UpadteData = await Notes.findByIdAndUpdate({ _id: id }, { tittle: tittle, description: description }, { new: true })
        return res.status(200).send({ status: true, msg: "Upadte sucessfully", data: UpadteData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        //        console.log(id)
        let validObject = isValidObjectId(id)
        // console.log(validObject)
        if (validObject === false) {
            return res.status(400).send({ status: false, msg: "Invalid ObjectId" })
        }

        let serachData = await Notes.find({ id })
        // console.log(serachData)
        if (!serachData) { return res.status(400).send({ stutus: false, msg: "bad request" }) }
        let deleteData = await Notes.findByIdAndUpdate({ _id: id }, { isdelete: true }, { new: true })
        return res.status(200).send({ status: true, msg: "deleted sucessfully" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}