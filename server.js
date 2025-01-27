const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const Blog = require('./model/blog.model')
const Router = require('./routes/blog.routes')
const pageRoutes = require('./routes/page.routes')
const Admin = require('./routes/admin.routes')
const cookieParser = require('cookie-parser')
const { accesspage } = require('./utilis/accessPage')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/profile', express.static('uploads'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



require('./config/db').dbConnect()
app.use('/', pageRoutes)
app.use('/api/blog', Router)
app.use('/api/admin', Admin)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))