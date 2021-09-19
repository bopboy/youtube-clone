const express = require('express')
const router = express.Router()

const { Like } = require('../models/Like')
const { DisLike } = require('../models/DisLike')
const { restart } = require('nodemon')

router.post('/getLikes', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId }
    else variable = { commentId: req.body.commentId }
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
})

router.post('/getDislikes', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId }
    else variable = { commentId: req.body.commentId }
    DisLike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })
})
router.post('/upLike', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId, userId: req.body.userId }
    else variable = { commentId: req.body.commentId, userId: req.body.userId }

    const like = new Like(variable)
    like.save((err, likeResult) => {
        if (err) return restart.json({ success: false, err })
        DisLike.findOneAndDelete(variable)
            .exec((err, disLiksResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
})
router.post('/unLike', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId, userId: req.body.userId }
    else variable = { commentId: req.body.commentId, userId: req.body.userId }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return restart.json({ success: false, err })
            res.status(200).json({ success: true })
        })
})
router.post('/upDislike', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId, userId: req.body.userId }
    else variable = { commentId: req.body.commentId, userId: req.body.userId }

    const dislike = new DisLike(variable)
    dislike.save((err, dislikeResult) => {
        if (err) return restart.json({ success: false, err })
        Like.findOneAndDelete(variable)
            .exec((err, liksResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
})
router.post('/unDislike', (req, res) => {
    let variable = {}
    if (req.body.videId) variable = { videoId: req.body.videoId, userId: req.body.userId }
    else variable = { commentId: req.body.commentId, userId: req.body.userId }

    DisLike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return restart.json({ success: false, err })
            res.status(200).json({ success: true })
        })
})
module.exports = router