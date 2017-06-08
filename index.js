'use strict';

module.exports = {
  getMoMA: require('./indicators/moMaTrend'),
  getMovingAverage: require('./indicators/movingAverage'),
  getSnapshot: require('./indicators/snapshot'),
  getVolatility: require('./indicators/volatility'),
  toTimeSeries: require('./utils/toTimeSeries'),
  timeSeriesSampler: require('./utils/timeSeriesSampler'),
  columns: require('./utils/columns'),
  duration: require('./utils/duration')
}