const request = require("request");

const location = (latitude, longitude, callback) => {
  const url =
    process.env.WEATHERSTACK_API_URL + latitude + "," + longitude + "&units=f";

  request({ url, json: true }, (err, { body } = {}) => {
    // console.log(body.current)
    if (err) {
      callback("Unable to connect to WeatherStack API.", undefined);
    } else if (body.error) {
      callback(
        "No forecast found for that search query.  Please try another.",
        undefined
      );
    } else {
      callback(
        undefined,
        `It is currently ${body.current.weather_descriptions[0]} with a temperature of ${body.current.temperature} degrees, but feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = location;
