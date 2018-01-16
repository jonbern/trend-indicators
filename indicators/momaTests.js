'use strict';
const expect = require('expectations');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noPreserveCache();

describe('Monthly moving average trend', () => {

  let moma;
  let timeSeries;
  let getMovingAverage;
  let timeSeriesSampler;
  let movingAverage;
  let samples;

  const movingAverageLength = 200;
  const samplingInterval = 10;

  const calculateMoma = (setup) => {
    timeSeries = ['not significant, because ma function is mocked'];
    movingAverage = ['not significant, because sampler function is mocked']

    getMovingAverage = sinon.stub().returns(movingAverage);
    timeSeriesSampler = sinon.stub().returns(setup.samples);
  
    moma = proxyquire('./moma', {
      './getMovingAverage': getMovingAverage,
      '../utils/timeSeriesSampler': timeSeriesSampler
    });

    return moma(timeSeries, setup.movingAverageLength, setup.samplingInterval);
  }

  it('invokes movingAverage', () => {
    calculateMoma({
      movingAverageLength,
      samplingInterval,
      samples: [
        ['2017-01-01', 10],
        ['2017-01-01', 11]
      ]
    });
    expect(getMovingAverage.calledWith(timeSeries, 200, 1, true, true)).toBe(true);
  });

  it('invokes timeSeriesSampler', () => {
    calculateMoma({
      movingAverageLength,
      samplingInterval,
      samples: [
        ['2017-01-01', 10],
        ['2017-01-01', 11]
      ]
    });
    expect(timeSeriesSampler.calledWith(movingAverage, 10)).toBe(true);
  });



  describe('#score', () => {

    describe('when perfect score', () => {

      it('returns 1', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 10],
            ['2017-01-01', 11],
            ['2017-01-01', 12],
            ['2017-01-01', 13],
            ['2017-01-01', 14],
            ['2017-01-01', 15],
            ['2017-01-01', 16],
            ['2017-01-01', 17],
            ['2017-01-01', 18],
            ['2017-01-01', 19],
            ['2017-01-01', 20]
          ]
        });
        expect(result.score).toBe(1);
      });

    });

    describe('when no gains', () => {

      it('returns null', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 10],
            ['2017-01-01', 10],
            ['2017-01-01', 10],
            ['2017-01-01', 10],
          ]
        });
        expect(result.score).toBe(null);
      });

    });

    describe('when no samples', () => {
      
      it('returns null', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: []
        });
        expect(result.score).toBe(null);
      });

    });

    describe('when 4 out of 10 gains', () => {
      
        it('returns correct score', () => {
          var result = calculateMoma({
            movingAverageLength,
            samplingInterval,
            samples: [
              ['2017-01-01', 10],
              ['2017-01-01', 9],
              ['2017-01-01', 9.2],
              ['2017-01-01', 9.4],
              ['2017-01-01', 8],
              ['2017-01-01', 7],
              ['2017-01-01', 6],
              ['2017-01-01', 6.3],
              ['2017-01-01', 6.5],
              ['2017-01-01', 5],
              ['2017-01-01', 5]
            ]
          });
          expect(result.score).toBe(null);
        });
            
      });

  });

  describe('#lastSampleBelowMaxSampleRange', () => {

    describe('when last value is 5% below maximum sample', () => {
      
      it('is true', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 1],
            ['2017-01-01', 2],
            ['2017-01-01', 10],
            ['2017-01-01', 9.4],
          ]
        });
        expect(result.lastSampleBelowMaxSampleRange).toBe(true);
      });

    });

    describe('when last value is less than 5% below maximum sample', () => {
      
      it('is true', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 1],
            ['2017-01-01', 2],
            ['2017-01-01', 10],
            ['2017-01-01', 9.6],
          ]
        });
        expect(result.lastSampleBelowMaxSampleRange).toBe(false);
      });

    });

    describe('when last value is maximum sample', () => {
      
      it('is true', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 1],
            ['2017-01-01', 2],
            ['2017-01-01', 10],
            ['2017-01-01', 11],
          ]
        });
        expect(result.lastSampleBelowMaxSampleRange).toBe(false);
      });

    });

  });

  describe('#sampleCount', () => {
        
      it('when 4', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: [
            ['2017-01-01', 1],
            ['2017-01-01', 2],
            ['2017-01-01', 10],
            ['2017-01-01', 11]
          ]
        });
        expect(result.sampleCount).toBe(4);
      });

      it('when empty array it is 0', () => {
        var result = calculateMoma({
          movingAverageLength,
          samplingInterval,
          samples: []
        });
        expect(result.sampleCount).toBe(0);
      });

  });

});
