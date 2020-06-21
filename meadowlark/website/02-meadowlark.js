const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const fortunes = [
    "Conquer",
    "Rivers",
    "Do not",
    "You will",
    "Whenever"
]

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune: randomFortune})
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

app.listen(PORT, () => console.log(
    `Express started on http://localhost:${PORT}`
))