const express = require('express')
const { auth } = require('../middleware/auth')
const multer = require('multer')
const ffmepg = require('fluent-ffmpeg')

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
router.post('/thumbnail', (req, res) => {
    let filePath = ''
    let fileDuration = ''
    ffmepg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata)
        console.log(metadata.format.duration)
        fileDuration = metadata.format.duration
    })
    ffmepg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('will generate ' + filenames.join(', '))
            console.log(filenames)
            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function () {
            console.log('screenshots taken')
            return res.json({ success: true, url: filePath, fileDuration })
        })
        .on('error', function (err) {
            console.error(error)
            return res.json({ success: false, err })
        })
        .screenshots({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
})
module.exports = router