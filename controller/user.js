const User = require("../models/user")
const mongoose = require("mongoose")


async function handleCreateUSer(req,res){
    const {fullName, email, password} = req.body
    await User.create({
        fullName,
        email,
        password,
    })
    return res.redirect("/")
}

async function handleSignUp(req,res){
    return res.render("signup")
}

async function handleSignIn(req,res){
    const {email,password} = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
    // req.session.user = token;
    // console.log("token",token);
    return res.cookie("token",token).redirect("/")
    }
    catch(error){
        res.locals.error = "Invalid Credentials"
        return res.render("signin")
    }
}

async function handleLogout(req,res){
  return res.clearCookie("token").redirect("signin")
};


module.exports = {
    handleCreateUSer,
    handleSignUp,
    handleSignIn,
    handleLogout,
}