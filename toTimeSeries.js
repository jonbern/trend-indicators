'use strict';

module.exports = (dateMap) => {
  return Object.keys(dateMap).map(date => {
    return [date, dateMap[date]];
  }).sort();
}
