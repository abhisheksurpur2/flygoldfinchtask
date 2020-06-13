const path = require('path')

const express = require('express')
const app = express()

var moment = require('moment'); 
const request = require('postman-request')
const url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole'

const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))

const viewsPath = path.join(__dirname, 'views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)


var namearray = []

request( { url: url } , (error, response, body ) => {
    
    const data = JSON.parse(body)
    
    data.forEach(function(item) {
    namearray.push(item.first+" "+item.last);
});
   // console.log(namearray)
})

app.listen(3000, () => {

    console.log('Server is up on port 3000.')

})

app.get('/names', (req, res) => {

    res.render('names',{

        name:namearray
    })
})

const getConversion = (c1 ,c2 , amt ,res)=>{

    //https://free.currconv.com/api/v7/convert?q=CRC_INR&compact=ultra&apiKey=dd8e835c3d0a875afe5e
    const url = 'https://free.currconv.com/api/v7/convert?q='+c1+'_'+c2+'&compact=ultra&apiKey=dd8e835c3d0a875afe5e'
    // console.log(c1)
    // console.log(c2)
    
    request ( { url: url } , (error, response, body )=>{

        const data = JSON.parse(body)
        

    var key = Object.keys(data)[0]
    
    var result = data[key] * amt

    res.render('currency',{

        amt : result
    })

    })
    
}

app.get('/currency', (req, res) => {

    var amount =   getConversion(req.query.curs1 , req.query.curs2 , req.query.amt,res)
    
    
})

