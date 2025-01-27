const Blog = require('../model/blog.model')

exports.store = async (req, res) => {
    try {
        console.log(req.file.filename);
        console.log(req.body);
        const { blog_cat, blog_title, blog_date, blog_author , blog_content, blog_desc } = req.body
        const existblog_title = await Blog.findOne({ blog_title }).countDocuments().exec()
        if (existblog_title > 0) {
            res.json({
                sucess: true,
                message: "blog title is already exist"
            })
        } else {
            console.log(req.body)
            await Blog.create({
                blog_cat, blog_title, blog_date, blog_author , blog_content, blog_desc, blog_img: req?.file?.filename
            })
            if (Blog) {
                // res.json({
                //     success: true,
                //     message: "category added"
                // })
                res.redirect('/viewBlog')
            }
        }
    } catch (error) {
        res.json(error)
    }
}

exports.index = async (req, res) => {

    try {
        const blog = Blog.find()
        if (blog) {
            res.json({
                success: true,
                blog
            })
        } else {
            res.json({
                success: true,
                message: "blog not found"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        await Blog.findByIdAndDelete(id)
        res.redirect('/viewBlog')
    } catch (error) {
        res.json(error)
    }

}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const { blog_cat, blog_title, blog_date, blog_author , blog_content, blog_desc } = req.body

        await Blog.findByIdAndUpdate(
            { _id: id },
            {
                blog_cat, blog_title, blog_date, blog_author , blog_content, blog_desc, blog_img: req?.file?.filename
            }
        )
        res.redirect('/viewBlog')
    } catch (error) {
        res.json(error)
    }
}