const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmF5Y29kaW5nIiwiYSI6ImNreTE3b3FrYzA4ZmMyb3A4bnNzYjJuMTYifQ._yvpbOyFxRI6otpjZwdHLg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("cannot connect weather service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      const coordinates = body.features[0].geometry.coordinates;
      callback(undefined, {
        Lat: coordinates[1],
        Lon: coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
