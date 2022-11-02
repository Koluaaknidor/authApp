const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const postService = require('./services/post.service')

const app = express()
app.use(express.json()) //let app receive json body

app.get('/posts', authenticateToken, (req, res) => {
    return res.status(200).json(postService.getPosts(req.user.login))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) {
        return res.status(401).json( { success: false, message: 'Access token not specified' } )
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json( { success: false, message: 'Invalid or expired token' } )
        }
        req.user = payload
        next()
    })
}
app.listen(4000)