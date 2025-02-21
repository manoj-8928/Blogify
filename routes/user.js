const express = require("express")
const router = express.Router();
const {handleCreateUSer, handleSignUp, handleSignIn, handleLogout} = require("../controllers/user")




router.get("/signin",async (req,res)=>{
    return res.render("signin");
})

router.post("/signin",handleSignIn)

router.get("/signup",handleSignUp)
router.post("/signup",handleCreateUSer)
router.get("/logout",handleLogout)

module.exports = router
