const express = require('express')
const { auth } = require('../middleware/auth')
const multer = require('multer')

const router = express.Router()

let storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "uploads/") },
    filename: (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`) },
    fileFlter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') return cb(res.status(400).end('only mp4 is allowd'), false)
        cb(null, true)
    }
})
const upload = multer({ storage }).single('file')
router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})
module.exports = router