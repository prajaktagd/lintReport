const assert = require('assert');
const { scale } = require('../src/scale.js');

describe('scale', () => {
  it('same domain and range', () => {
    const actual = scale({ start: 0, end: 100 }, { start: 0, end: 100 }, 50);
    assert.strictEqual(actual, 50);
  });

  it('range end greater than domain end', () => {
    const actual = scale({ start: 0, end: 100 }, { start: 0, end: 600 }, 50);
    assert.strictEqual(actual, 300);
  });

  it('range end less than domain end', () => {
    const actual = scale({ start: 0, end: 200 }, { start: 0, end: 100 }, 100);
    assert.strictEqual(actual, 50);
  });

  it('range starting from non-zero positive number', () => {
    const actual = scale({ start: 0, end: 200 }, { start: 100, end: 500 }, 100);
    assert.strictEqual(actual, 300);
  });

  it('domain starting from non-zero positive number', () => {
    const actual = scale({ start: 100, end: 500 }, { start: 0, end: 200 }, 300);
    assert.strictEqual(actual, 100);
  });

  it('domain and range starting from non-zero positive number', () => {
    const actual = scale({ start: 100, end: 500 }, { start: 10, end: 50 }, 300);
    assert.strictEqual(actual, 30);
  });

  it('range as negative', () => {
    const actual = scale({ start: 10, end: 20 }, { start: -20, end: -10 }, 15);
    assert.strictEqual(actual, -15);
  });
});
