'use strict';

module.exports = (timeSeries, period, column) => {
  let tsClean = timeSeries.filter(item => {
    return !!item[column];
  });

  if (tsClean.length < period) {
    return null;
  }

  let values = [];

  for (let i = tsClean.length - period; i < tsClean.length; i++) {
    values.push(tsClean[i][column])
  }

  let returns = [];

  for (let i = 1; i < values.length; i++) {
    let dailyReturn = values[i] / values[i - 1];
    returns.push(dailyReturn);
  }

  let sumReturns = returns.reduce((acc, curr) => {
    return acc + curr;
  });

  let meanReturn = sumReturns / returns.length;

  let sumSquaredDeviations = 0;
  for (let i = 0; i < returns.length; i++) {
    sumSquaredDeviations += Math.pow(returns[i] - meanReturn, 2);
  }

  let variance = sumSquaredDeviations / returns.length;
  let standardDeviation = Math.sqrt(variance);  
  
  return +(standardDeviation * 100).toFixed(2);
}
