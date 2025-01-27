exports.accesspage = (req, res, url) => {
    try {
        if (!req.cookies.admin) {
            res.redirect('/login')
        } else {
            res.render(url)
        }
    } catch (error) {
        res.json(error)
    }
}