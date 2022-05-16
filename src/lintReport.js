/* eslint-disable no-magic-numbers */
const fs = require('fs');
const { generateTag } = require('./generateTag.js');

const readFile = (file) => fs.readFileSync(file, 'utf8');
const getFileName = (path) => path.match(/[^/]*$/);
const barWidth = (number) => number * 10;

const countFrequency = function (frequencies, error) {
  frequencies[error.ruleId] = frequencies[error.ruleId] || 0;
  frequencies[error.ruleId]++;
  return frequencies;
};

const generateBar = function (width) {
  return generateTag('div',
    [
      { name: 'class', value: 'bar' },
      { name: 'style', value: [{ name: 'width', value: width }] }
    ], '');
};

const generateRow = function (errorName, errorCount, barWidth) {
  const column1 = generateTag('td', [{ name: 'class', value: 'error-name' }],
    errorName + ' (' + errorCount + ')');
  const column2 = generateTag('td', [], generateBar(barWidth));
  return generateTag('tr', [], column1 + column2);
};

const generateRows = function (errorCounts) {
  const errorNames = Object.keys(errorCounts);
  return errorNames.map((errorName) => {
    const errorCount = errorCounts[errorName];
    return generateRow(errorName, errorCount, barWidth(errorCount));
  });
};

const histogram = function (report) {
  const errorCounts = report.messages.reduce(countFrequency, {});
  const rows = generateRows(errorCounts);
  return generateTag('table', [], rows.join(''));
};

const fileReport = function (report) {
  if (report.errorCount === 0) {
    return '';
  }

  const fileName = getFileName(report.filePath);
  const section = generateTag('p', [], fileName) + histogram(report);
  return generateTag('div', [{ name: 'class', value: 'histogram' }], section);
};

const lintReport = function (templateFile, lintReportFile) {
  const template = readFile(templateFile);
  const lintReport = JSON.parse(readFile(lintReportFile));

  const reportHtml = lintReport.map(fileReport).join('');
  const html = template.replace('__REPORT__', reportHtml);
  fs.writeFileSync('./html/index.html', html, 'utf8');
};

lintReport('./resources/template.html', './resources/lintReport1.json');
