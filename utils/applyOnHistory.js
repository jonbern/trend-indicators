module.exports = function (timeSeries, movingAverageLength, samplingInterval) {
  let runs = [];

  for (let i = timeSeries.length - 1; i > 0; i--) {
    let currentDate = timeSeries[i][columns.date];
    
    let lastDate = moment(currentDate);
    let firstDate = moment(currentDate).subtract(1, 'years');

    let daysInYear = lastDate.diff(firstDate, 'days');
    
    let runLength = i > daysInYear ? daysInYear : i;
    let run = new Array(runLength);

    for (let j = runLength - 1, k = 0; j >= 0; j--, k++) {
      run[j] = timeSeries[i - k];
    }

    runs.push(run);
  }

  let results = {};

  runs.forEach((run, i) => {
    let date = run[run.length - 1][columns.date];    
    results[date] = getMoma(run, movingAverageLength, samplingInterval).score;
  });

  return results;
}