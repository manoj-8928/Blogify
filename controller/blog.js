const multer = require("multer")
const Blog = require("../models/blog")
const path = require("path")
const Comment = require("../models/comment")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, path.resolve(__dirname, "../public/uploads"))
    },
    filename : function(req,file,cb){
       const filename = `${Date.now()}-${file.originalname}`
        return cb(null,filename)
    }
})

const upload = multer({storage : storage})


async function handleCreateBlog(req,res){
    return res.render("addBlog",{
        user : req.user,
    })
}

async function handleBlogData(req,res){
    console.log("Running handleblogdata")
    const {title,body} = req.body
    console.log(req.body)
    const blog = await Blog.create({
        title,
        body,
        createdBy : req.user._id,
        ImageUrl  : `/uploads/${req.file.filename}`
        
    }) 
    console.log(blog)
    return res.redirect(`/blog/${blog._id}`)
}

async function handleGetBlogById(req,res){
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({blogId : req.params.id}).populate("createdBy") 
    console.log(comments,"comment")
    return res.render("blog",{
        user : req.user,
        blog,
        comments,
    })
}

async function handleComment(req,res){
    await Comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id
})
    return res.redirect(`/blog/${req.params.blogId}`)
}

module.exports = {
    handleCreateBlog,
    handleBlogData,
    upload,
    handleGetBlogById,
    handleComment,
} 