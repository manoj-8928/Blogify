const express = require("express")
const router = express.Router()
const {handleCreateBlog, handleBlogData,upload, handleGetBlogById, handleComment} = require("../controllers/blog")

router.get("/addblog",handleCreateBlog)
router.post("/addblog",upload.single("ImageUrl"),handleBlogData)

router.get("/:id",handleGetBlogById)

router.post("/comment/:blogId",handleComment)

module.exports = router;