const { Schema, model } = require("mongoose");

const common = {
    type: String,
    required: true,
    unique: true,
    trim: true
}
const blogSchema = new Schema({
    blog_cat: common,
    blog_title: {
        ...common,
        unique: true,
    },
    blog_date: common,
    blog_author: common,
    blog_content: common,
    blog_desc: common,
    blog_img: String,
}, {
    timestamps: true
}
)
const Blog = model('Blog', blogSchema)

module.exports = Blog