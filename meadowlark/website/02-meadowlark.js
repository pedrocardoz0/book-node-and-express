const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('../../ch04/lib/fortune.js')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()

app.disable('x-powered-by')

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000

//app.use(cookieParser(credentials.cookieSecret))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home', { test:[{ name: 'js'}, {name: 'py'}],}))

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

app.get('/test', (req, res) => {
    res.send('testing')
})

app.get('/headers', (req, res) => { 
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}:${value}`)
    res.send(headers.join('\n'))
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.use((req, res, next) => {
    console.log(`Processing request for ${req.url}`)
    next()
})

app.use((req, res) => {
    console.log('Closing the process')
    res.send('THX for playing')
})

app.use((req, res) => {
    console.log('i\'ll never be executed')
})


app.listen(PORT, () => console.log(
    `Express started on http://localhost:${PORT}`
))