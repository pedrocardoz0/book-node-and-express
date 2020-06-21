const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})

app.engine('handlebars', expressHandlebars ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
//404 personalized message 
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

//500 Page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(PORT, () => console.log(
    `Express started on http://localhost:${PORT}`
))