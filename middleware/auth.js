const { validateToken } = require("../services/authentication")

function checkForAuthentication(cookieName){
    return (req,res,next) =>{
        const tokenValue = req.cookies[cookieName]
    if(!tokenValue){
        return next()
    }

    try{
    const Userpayload = validateToken(tokenValue)
    // console.log(Userpayload)
    req.user = Userpayload;
    }
    catch(err){
            console.error("Token validation failed:", err);
    }
    return next()
    }
  }

module.exports = {
    checkForAuthentication,
}