const express = require('express')
const handlers = require('../../ch05/lib/handlers')
const expressHandlebars = require('express-handlebars')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.engine('handlebars', expressHandlebars ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
//404 personalized message 
app.use(handlers.notFound)

//500 Page
app.use(handlers.serverError)

app.listen(PORT, () => console.log(
    `Express started on http://localhost:${PORT}`
))