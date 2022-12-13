
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

exports.isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return true;
    if (typeof value === "string" && value.trim().length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
}
exports.isValidBody = function (body) {
    return Object.keys(body).length = 0;
};


exports.isValidString = (String) => {
    return /\d/.test(String)
}

exports.isValidEmail = (email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(email)
  };

exports.isValidPwd = (Password) => {
    return /^(?!.* )(?=.*[a-zA-Z]).{8,15}$/.test(Password)
}
exports.isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}
exports.isValidObjectId=(id)=> {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false
    }
    return false
}
