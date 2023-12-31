const express = require('express')
const bodyParser = require('body-parser') 
const https = require('https')

const app = express()

app.use(bodyParser.urlencoded({extended:true})) // took from youtube

app.get('/', (req, res)=> {
   res.sendFile(__dirname + '/index.html')
})
app.post('/', (req, res)=> {
    const city =  req.body.cityName
const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=f58f365721b043ba31e472b34371b343'
https.get(url, (response)=> {
    response.on('data', (data)=> {
        const whetherData =JSON.parse(data)
        console.log(whetherData);
        let temp = whetherData.main.temp
        let latestTemp = temp -  273;
        res.send(`<h1>Temperature in ${city} is ${latestTemp.toFixed(2)} <sup>o</sup> C</h1>`)
    })
})
})

app.listen(5000, ()=> {
    console.log('server is listening on port 5000');
})



// 'https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=f58f365721b043ba31e472b34371b343'