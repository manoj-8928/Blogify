const JWT = require("jsonwebtoken")
const secret = "M@noj@#$"

function createToken(user){
    const payload = {
        fullName : user.fullName,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role,
        _id : user._id
    }
    const token = JWT.sign(payload,secret)
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createToken,
    validateToken,
}
