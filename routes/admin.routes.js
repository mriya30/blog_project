const adminController = require('../controller/admin.controller')
const upload = require('../middleware/upload')
const router = require('express').Router()

router.post('/register', adminController.register)
router.post('/login', adminController.login)
router.post('/updateProfile',upload.single('admin_profile'),adminController.updateProfile)


module.exports = router