'use strict';
const columns = require('../utils/columns');

module.exports = (historyTS) => {
  let tsSorted = historyTS
    .filter(item => {
      return (item[columns.close] && item[columns.close] !== 0);
    })

  if (tsSorted.length === 0) {
    return null;
  }

  let prevClose = tsSorted[tsSorted.length - 1][columns.close];

  let min;
  let max;

  tsSorted.forEach(entry => {
    if (min === undefined || entry[columns.close] < min) {
      min = entry[columns.close];
    }

    if (max === undefined || entry[columns.close] > max) {
      max = entry[columns.close];
    }
  });

  return {
    percentChangeFrom52WeekHigh: (prevClose / max) - 1,
    percentChangeFrom52WeekLow: (prevClose / min) - 1,
    changeFrom52WeekHigh: prevClose - max,
    changeFrom52WeekLow: prevClose - min,
    previousClose: prevClose
  }
}
