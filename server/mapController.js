const fetch = require('node-fetch');
const secret = require('../secrets');

const mapController = {};

//assign API keys to variables
const privateKey = secret.privateKey;
const publicKey = secret.publicKey;

//assign API forecast ids to locations
const locations = {
  switzerFalls: secret.sw_falls_id,
  griffithPark: secret.griffith_park_id
}

//convert units from the API measurement to the frontend Heatmap measurement
const conversion = {
  '-2': 10,
  '-1': 30,
  '0': 50,
  '1': 70,
  '2': 90
}

mapController.getHeat = (req, res, next) => {
  //deconstruct request body to get desired location

  //make fetch call to API
  fetch(`https://besttime.app/api/v1/forecasts/now?api_key_public=${publicKey}&venue_id=${locations.griffithPark}`)
    .then(data => {
      data.json()
        .then(parsedData => {
          //the returned intensity variable rates traffic on a scale from -2 to 2, and 999 indicates the trail is closed
          const intensity = conversion[parsedData.analysis.hour_analysis.intensity_nr];
          res.locals.data = intensity;
          return next();
        })
    })
    .catch(err => {
      console.log('error', err);
      return next(err);
    })
}

module.exports = mapController;