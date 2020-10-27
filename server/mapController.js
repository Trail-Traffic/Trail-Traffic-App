const fetch = require('node-fetch');
const mapController = {};

const privateKey = process.env.PRIVATE_KEY;
const locations = {
  'Switzer Falls' : [process.env.SW_FALLS_VID, process.env.SW_FALLS_PK]
}

mapController.getHeat = (req, res, next) => {
  fetch(`https://besttime.app/api/v1/venues?api_key_private=${privateKey}`)
    .then(data => {
      console.log('private key ', privateKey)
      data.json()
        .then(parsedData => {
          console.log(parsedData);
          res.locals.data = parsedData[0];
          return next();
        })
    })
    .catch(err => {
      console.log('error', err);
      return next(err);
    })
}

module.exports = mapController;