const fetch = require("node-fetch");
const secret = require("../secrets");

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
  runyonCanyon: secret.runyon_canyon_id,
};

//convert units from the API measurement to the frontend Heatmap measurement
const conversion = {
  "-2": 10,
  "-1": 30,
  0: 50,
  1: 70,
  2: 90,
};

const latlong = {
  switzerFalls: { latitude: 34.2638892, longitude: -118.1740902 },
  griffithPark: { latitude: 34.1281475, longitude: -118.3010914 },
  elysianPark: { latitude: 34.0820739, longitude: -118.2497133 },
  eatonCanyon: { latitude: 34.1783564, longitude: -118.0966051 },
  runyonCanyon: { latitude: 34.1193155, longitude: -118.353079 },
};

mapController.getHeat = (req, res, next) => {
  //init an empty array to hold promises that resolve to heatMapObjs
  const heatMapArray = [];

  //iterate through all locations
  for (let trail in locations) {
    //create a new promise for each location
    const heatMapPromise = new Promise((resolve, reject) => {
      //async operation: fetch request to API
      fetch(`https://besttime.app/api/v1/forecasts/now?api_key_public=${publicKey}&venue_id=${locations[trail]}`)
      .then((data) => {
        data.json().then((parsedData) => {
          console.log('data returned from API', parsedData)
          const weight = conversion[parsedData.analysis.hour_analysis.intensity_nr];
          const heatMapObj = {
            latitude: latlong[trail].latitude,
            longitude: latlong[trail].longitude,
            weight,
          };
          //when promise resolves, heatMapObj is returned
          resolve(heatMapObj);
        });
      })
      .catch((err) => {
        return next(err);
      })
    })
    //push promises into array
    heatMapArray.push(heatMapPromise)
  }
  
  //this waits for all promises to resolve to heatMapObjs
  Promise.all(heatMapArray)
    //then that array is saved to res.locals
    .then((array) => res.locals.data = array)
    .then((array) => next())

};

module.exports = mapController;
