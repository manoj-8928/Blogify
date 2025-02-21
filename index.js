const express = require("express")
const app = express();
const path  = require("path")
const session = require("express-session")
const cookieParse = require("cookie-parser")
const {connectDB} = require("./connection")
connectDB("mongodb://127.0.0.1:27017/blogs")
const Blog = require("./models/blog")

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog")
const { checkForAuthentication } = require("./middleware/auth");

app.use(express.urlencoded({extended : false}))
app.use(cookieParse())
app.use(checkForAuthentication("token"))
app.use(express.static(path.resolve('./public')));


app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({})
    return res.render("home",{
    user : req.user,
    blogs : allBlogs,
    })
})

app.use("/user",userRouter)
app.use("/blog",blogRouter)

app.listen(3000,()=>{
    console.log("Server Started")
})