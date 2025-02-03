const router = require('express').Router()
const Admin = require('../model/admin.model')
const Blog = require('../model/blog.model')
const { AccessPage } = require('../utilis/accessPage')


router.get('/', AccessPage,(req, res) => {
    res.render("pages/index")
    // console.log(req.cookies.Admin)
})

router.get('/addBlog', AccessPage,async (req, res) => {
   res.render('pages/addBlog')
})

router.get('/viewBlog',AccessPage, async (req, res) => {
    const blog = await Blog.find()
    res.render('pages/viewBlog', {
        blog
    })
})

router.get('/updateBlog',AccessPage, async (req, res) => {
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

router.get('/logout',AccessPage, async (req, res) => {
    res.clearCookie('Admin')
    res.redirect('/login')
})

router.get('/myprofile',AccessPage, async (req, res) => {
    const cookieAdmin = req.cookies.admin
    const email = cookieAdmin.email
    const singleAdmin = await Admin.findOne({ email })
    res.render('pages/myProfile', { admin: singleAdmin })
})

module.exports = router