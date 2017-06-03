'use strict';
const moMA = require('./moMATrend');
const movingAverage = require('./movingAverage');
const toTimeSeries = require('./toTimeSeries');
const timeSeriesSampler = require('./timeSeriesSampler');
const snapshot = require('./snapshot');
const volatility = require('./volatility');
const colums = require('./columns');

module.exports = {
  moMA: moMA,
  movingAverage: movingAverage,
  toTimeSeries: toTimeSeries,
  timeSeriesSampler: timeSeriesSampler,
  snapshot: snapshot,
  volatility: volatility,
  columns: columns
}