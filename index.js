'use strict';
const moMA = require('./moMATrend');
const movingAverage = require('./movingAverage');
const toTimeSeries = require('./toTimeSeries');
const timeSeriesSampler = require('./timeSeriesSampler');
const snapshot = require('./snapshot');
const volatility = require('./volatility');

module.exports = {
  moMA: moMa,
  movingAverage: movingAverage,
  toTimeSeries: toTimeSeries,
  timeSeriesSampler: timeSeriesSampler,
  snapshot: snapshot,
  volatility: volatility
}