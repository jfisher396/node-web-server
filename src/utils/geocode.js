const request = require("request");

const geocode = (address, callback) => {
  const url =
    process.env.MAPBOX_API_URL + encodeURIComponent(address) + process.env.MAPBOX_API_KEY;

  request({ url: url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to MapBox API.", undefined);
    } else if (body.features.length === 0) {
      callback(
        "No coordinates found for that search query.  Please try another.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
