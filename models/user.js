const mongoose = require("mongoose")
const {createHmac,randomBytes} = require("crypto");
const { createToken } = require("../services/authentication");


const userSchema = new mongoose.Schema({
    fullName  : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    salt : {
        type : String,
        // required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER",
    },
    profileImageUrl : {
        type : String,
        default : "/Images/default.png"
    }
},{timestamps : true})

userSchema.pre("save",function (next){
    const user = this;
    if(!user.isModified("password")){
        return;
    }
    const salt = randomBytes(16).toString();
    const hash = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hash;
    next();
})

userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw new Error ("User not found")
    }
    const salt = user.salt
    const hashedpassword = user.password;

    const userProvidedHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex");

     if(hashedpassword !== userProvidedHash){
        throw new Error("Invalid Arguments")
    }
    const token = createToken(user);
    return token;
})
const User = new mongoose.model("user",userSchema)

module.exports  =  User
