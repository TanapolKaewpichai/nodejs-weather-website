const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=812f5d9ce9f1ebdb59b816587f8da1c4&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("cannot connect weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}.It's currently ${body.current.temperature} Celsius`
      );
    }
  });
};

module.exports = forecast;
