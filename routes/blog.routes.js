const upload = require('../middleware/upload')
const controller = require('../controller/blog.controller')
const router = require('express').Router()
router.post('/', upload.single('blog_img'),controller.store)
router.get('/', controller.index)
router.get('/:id', controller.trash)
router.post('/:id', upload.single('blog_img'), controller.update)


module.exports = router