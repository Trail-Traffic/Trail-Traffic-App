const fetch = require('node-fetch');
const secret = require('../secrets');

const mapController = {};

//assign API keys to variables
const privateKey = secret.privateKey;
const publicKey = secret.publicKey;

//assign API forecast ids to locations
const locations = {
  switzerFalls: secret.sw_falls_id,
  griffithPark: secret.griffith_park_id,
  elysianPark: secret.elysian_park_id,
  eatonCanyon: secret.eaton_canyon_id,
  runyonCanyon: secret.runyon_canyon_id
}

//convert units from the API measurement to the frontend Heatmap measurement
const conversion = {
  '-2': 10,
  '-1': 30,
  '0': 50,
  '1': 70,
  '2': 90
}

const latlong = {
  switzerFalls: { latitude: 34.2638892 , longitude: -118.1740902 },
  griffithPark: { latitude: 34.1281475 , longitude: -118.3010914 },
  elysianPark: { latitude: 34.0820739 , longitude: -118.2497133 },
  eatonCanyon: { latitude: 34.1783564 , longitude: -118.0966051 },
  runyonCanyon: { latitude: 34.1193155,  longitude: -118.353079 }
}

mapController.getHeat = (req, res, next) => {
  //deconstruct request body to get desired location
  // const { trail } = req.body;
  const trail = 'griffithPark';
  //make fetch call to API
  fetch(`https://besttime.app/api/v1/forecasts/now?api_key_public=${publicKey}&venue_id=${locations[trail]}`)
    .then(data => {
      data.json()
        .then(parsedData => {
          //the returned intensity variable rates traffic on a scale from -2 to 2, and 999 indicates the trail is closed
          const weight = conversion[parsedData.analysis.hour_analysis.intensity_nr];
      
          res.locals.data = { latitude: latlong[trail].latitude, longitude: latlong[trail].longitude, weight};
          console.log(data);
          return next();
        })
    })
    .catch(err => {
      console.log('error', err);
      return next(err);
    })
}

module.exports = mapController;