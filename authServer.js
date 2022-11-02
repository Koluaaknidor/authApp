const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const userService = require('./services/user.service')

const app = express()
app.use(express.json()) //let app receive json body

app.post('/login', async (req, res) => {
    const { login, pass } = req.body
    const user = userService.getUser(login)
    if (user) {
        if (await bcrypt.compare(pass, user.pass)) {
            const payload = { login: user.login, email: user.email, role: user.role }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' } )
            return res.status(201).json( { success: true, accessToken } )
        }
    }
    return res.status(200).json( { success: false, message: 'Invalid username/password' } )
})

app.post('/register', async (req, res) => {
    const { login, pass, email } = req.body
    if ( !userService.getUser(login) ) {
        const hashedPass = await bcrypt.hash(pass, 10)
        userService.addUser(login, hashedPass, email)
        return res.status(201).json( { success: true } )
    }
    return res.status(200).json( { success: false, message: 'Login already exists' } )
})


app.listen(3000)