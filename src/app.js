
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()

const weatherData = require('../utils/weatherData')

const port = process.env.PORT || 3000

const publicSataticDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicSataticDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        header: "Header"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter address in search text"
        })
    }

    weatherData(address, (error, { temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName)
        res.send({
            temperature,
            description,
            cityName
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found"
    })
})
app.listen(port, () => {
    ;
})