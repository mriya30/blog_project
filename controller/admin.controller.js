const Admin = require("../model/admin.model")
const { plainTohash, hashToPlain } = require('../utilis/password')

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body
        console.log(req.body)
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            // res.json("email is already exist")
            res.redirect('/register')
        }
        else {
            const hash_pass = await plainTohash(password)
            console.log("test.............")
            // console.log(hash_pass)
              await Admin.create({ username, email, password: hash_pass })
              res.redirect('/login')
        }
    } catch (error) {
        res.json(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            const admin = await Admin.findOne({ email })
            const match_pass = await hashToPlain(password, admin.password)
            if (match_pass) {
                const payload = {
                    username: admin.username,
                    email: admin.email,
                }
                ///set data into cookie
                res.cookie('admin', payload, { httpOnly: true })
               res.redirect('/')
            } else {
                res.json("password incorrect")
            }
        } else {
            res.json("email is not exist")
        }
    } catch (error) {
        res.json(error)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const { email, username } = req.body
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            await Admin.updateOne(
                { email: email },
                {
                    username,
                    admin_profile: req?.file?.filename
                }
            )
            res.redirect('/myProfile')
        }
        else {
            res.json("email not exist ")
        }
    } catch (error) {
        res.json(error)
    }

}
