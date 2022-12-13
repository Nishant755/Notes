const express = require("express");
const routes = express.Router();
const UserControlers = require("../Controlers/UserControler.js")
const NoteControlers = require("../Controlers/NoteControler.js")
const authenticate=require("../Middleware/authentication");
const { Router } = require("express");


routes.post("/post/user", UserControlers.createNote);
routes.post("/login/user",UserControlers.login)
routes.post("/post/notes",authenticate.authenticate,NoteControlers.createNote)
routes.get("/get/notes/:id",authenticate.authenticate,NoteControlers.getnotesbyId)
routes.put("/update/:id",authenticate.authenticate,NoteControlers.upadate)
routes.delete("/delete/:id",authenticate.authenticate,NoteControlers.delete)
module.exports=routes