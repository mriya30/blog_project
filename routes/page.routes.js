const router = require('express').Router()
const Admin = require('../model/admin.model')
const Blog = require('../model/blog.model')
const { accesspage } = require('../utilis/accessPage')


router.get('/', (req, res) => {
    // res.render("pages/index")
    // console.log(req.cookies.Admin)
    accesspage(req, res, "pages/index")
})

router.get('/addBlog', async (req, res) => {
    accesspage(req, res, 'pages/addBlog')
})

router.get('/viewBlog', async (req, res) => {
    const blog = await Blog.find()
    res.render('pages/viewBlog', {
        blog
    })
})

router.get('/updateBlog', async (req, res) => {
    const { id } = req.query
    const singleBlog = await Blog.findById(id)
    res.render('pages/updateBlog',
        { blog: singleBlog }
    )
})

router.get('/register', async (req, res) => {
    res.render('pages/register')
})

router.get('/login', async (req, res) => {
    res.render('pages/login')
})

router.get('/logout', async (req, res) => {
    res.clearCookie('Admin')
    res.redirect('/login')
})

router.get('/myprofile', async (req, res) => {
    const cookieAdmin = req.cookies.admin
    const email = cookieAdmin.email
    const singleAdmin = await Admin.findOne({ email })
    res.render('pages/myProfile', { admin: singleAdmin })
})

module.exports = router