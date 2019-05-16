const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


// define paths for express config

const pupblicPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname,'../templates/partial')

// initiate server using express
const app = express()
const port = process.env.PORT || 3000 


//setup static directory to serve
app.use(express.static(pupblicPath))

//setup handlbars engine and views location
app.set('view engine','hbs')
app.set('views',templatePath)
hbs.registerPartials(partialpath)



app.get('' ,(req,res)=> {
    res.render('index', {
        title:'weather home page dynamic',
        name:'elsabboo',
        titleee:'homepage'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:'about page dynamic',
        name:'elsabbo',
        titleee:'about page'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'help page',
        name:'help content generator',
        titleee:'help page'
    })
} )

app.get('/weather' ,(req,res) => {
   
    if (!req.query.address) {
      return  res.send({error : 'you must enter an address'})
    }

    geocode(req.query.address,(error,{ latitude, longtitude, location}={})=> {
        if (error) {
          return res.send({error})
        }
        
        forecast(latitude, longtitude, (error, dataf) => {
           if (error) {
             return res.send({error})
           } 
           res.send({
              location,
              weather:dataf,
              address:req.query.address
           })
          })
          
        })
})

app.get('/help/*',(req,res) => {
    res.render('error', {
        errorx:'help article not found',
    })
})


app.get('*',(req,res) => {
    res.render('error', {
        errorx:'page not found',
    })
})






app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
});