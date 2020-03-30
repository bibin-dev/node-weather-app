const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public/index.html'));

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
// creating custom views folder path
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs');
// setting the views to the custom path
app.set('views', viewPath)
// code to register partials
hbs.registerPartials(partialsPath)

// Setup specific directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Bibin Joseph",
        footerData: "Copyright Bibin Joseph"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        message: "Created by Bibin Joseph",
        footerData: "Copyright Bibin Joseph"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "created by Bibin Joseph",
        footerData: "Copyright Bibin Joseph"
    })
})

// for erroneous cases of help URLs
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'help page not found',
        footerData: 'Copyright Bibin Joseph'
    })
})

app.get('/weather', (req, res) => {
    // .query used to get query params in request URL
    if (!req.query.address) {
       return res.send({
           error: 'Please provide an address'
       })
    }

    var address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        //weather forecast 
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    forecastError
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address
             })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// for all cases not yet specified (using the wildcard character)
// IMPORTANT: should be placed last on the list of page routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Requested page not found',
        footerData: 'Copyright Bibin Joseph'
    })
})


// function to initialise server routes and associated functionality
// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Bibin",
//         age: 28
//     }, 
//     {
//         name: "Rashmi",
//         age: 28
//     }]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Me!!!<h1>');
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Sunny Weather',
//         location: "New Delhi"
//     });
// })

// function to start server on a specified port
app.listen(port, () => {
    console.log("Server has started correctly on port " + port);
});