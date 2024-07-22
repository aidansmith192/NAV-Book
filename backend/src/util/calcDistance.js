// got these function from the stack overflow post on
// how to calculate the distance from
// two latitude and longitude points
// https://stackoverflow.com/questions/18883601/
// function-to-calculate-distance-between-two-coordinates

// Converts numeric degrees to radians
const toRad = (Value) => {
  return Value * Math.PI / 180;
};

const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const lat11 = toRad(lat1);
  const lat22 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) *
           Math.cos(lat11) * Math.cos(lat22);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1.609; // converts km to miles
};

module.exports = calcDistance;

