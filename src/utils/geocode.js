const request = require('request')

// elsabban edit on andrew work

// const geocode = (country,callback) => {
   
//     const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoiZWxzYWJiYW4iLCJhIjoiY2p2NWxhYnVzMTN0aDQzbzdoZDE3aG5qdiJ9.cCUPcyl6OFYBfDzNImc7NQ`
//     request({url:geocodeUrl,json:true},(error,response) => {
//         if (error) {
//             console.log('there is no internet connection')
//         }else if(response.body.message) {
//             console.log(response.body.message)
//         }else {
//             const latitude = response.body.features[0].center[0]
//             const longtitude = response.body.features[0].center[1]
//             callback(longtitude,latitude) 
//         }
        
//     })
// }
// const func = (x,y) => {
//     const obj ={lo:x,la:y}

//     const url = `https://api.darksky.net/forecast/742781d1247701410002f84c9819c4bb/${obj.lo},${obj.la}?units=si&lang=en`

// request({ url: url , json:true}, (error, response) => {
//    if (error) {
//        console.log('there is no internet connection')
//    }else if(response.body.error) {
//        console.log(response.body.error)
//    }else{
//     const data = response.body.currently
//     console.log(response.body.timezone + ' ' +response.body.daily.data[0].summary + ' it is currently ' + data.temperature + ' degrees out. ' + 'there is a ' + data.precipProbability + '% to rain')
 
//    }

//    })
// }
// module.exports = {
//     geocode:geocode,
//     func:func
// }





const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWxzYWJiYW4iLCJhIjoiY2p2NWxhYnVzMTN0aDQzbzdoZDE3aG5qdiJ9.cCUPcyl6OFYBfDzNImc7NQ`
     
    request({url,json:true},(error,{body}) => {
        
        if(error) {
          callback('there is no internet connection',undefined)
        }else if(body.features.length === 0) {
            callback('try another location',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode



