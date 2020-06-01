const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();

const port = process.env.PORT || 3000;
// Define paths for express config
const publicPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPaths = path.join(__dirname,'../templates/partials');

//Setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPaths)
//setup static directory to serve

app.use(express.static(publicPath))
// Routes
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Sahil'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'about me',
        name:'Sahil'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        msg:'Get help about the App here',
        title:'Help',
        name:'Sahil'
    })
})

app.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"You must provide an Adress"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
       
        if(error){
           return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
           
            if(error){
               return res.send({
                   error:error
               })
            }
            return res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'sunny',
    //     location:'Tamil nadu',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        msg:'Help article not found',
        title:'404',
        name:'Sahil'
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        msg:'Page not found',
        title:'404',
        name:'Sahil'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on ' + port)
})