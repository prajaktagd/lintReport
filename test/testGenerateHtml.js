const assert = require('assert');
const { generateHtml } = require('../src/generateHtml.js');

describe('generateHtml function', () => {
  it('dom with only tag', () => {
    const actual = generateHtml(['html', {}, '']);
    assert.strictEqual(actual, '<html ></html>');
  });

  it('dom without attributes and with simple content', () => {
    const actual = generateHtml(['html', {}, 'Hello']);
    assert.strictEqual(actual, '<html >Hello</html>');
  });

  it('dom with a single attribute and simple content', () => {
    const actual = generateHtml(['div', { class: 'card' }, 'Hello']);
    assert.strictEqual(actual, '<div class="card">Hello</div>');
  });

  it('dom with multiple attributes and simple content', () => {
    const actual = generateHtml(['div', { class: 'card', id: '1' }, 'Hello']);
    assert.strictEqual(actual, '<div class="card" id="1">Hello</div>');
  });

  it('dom with attribute as style and simple content', () => {
    const actual = generateHtml(['div', {
      class: 'card', style: { 'background-color': 'red' }
    }, 'Hello']);
    assert.strictEqual(actual,
      '<div class="card" style="background-color:red">Hello</div>');
  });

  it('dom with multiple properties and simple content', () => {
    const actual = generateHtml(['div', {
      style:
        { 'background-color': 'red', width: '100px', height: '100%' }
    }, 'Hello']);
    assert.strictEqual(actual,
      '<div style="background-color:red;width:100px;height:100%">Hello</div>');
  });

  it('dom with content as a element', () => {
    const actual = generateHtml(['body', {}, ['div', {
      style: { 'background-color': 'red' }
    }, 'Hello']]);
    assert.strictEqual(actual,
      '<body ><div style="background-color:red">Hello</div></body>');
  });

  it('dom with content as nested elements', () => {
    const actual = generateHtml(['body', {}, ['div', {
      style: { 'background-color': 'red' }
    }, ['p', {}, 'This is some sentence.']]]);
    assert.strictEqual(actual,
      '<body ><div style="background-color:red">' +
      '<p >This is some sentence.</p></div></body>');
  });

  it('dom with content as multiple elements', () => {
    const actual = generateHtml(['body', { style: { width: '960px' } },
      ['div', {
        style: { 'background-color': 'red' }
      }, 'cat'], ['p', {}, 'This is some cat.']]);
    assert.strictEqual(actual,
      '<body style="width:960px"><div style="background-color:red">cat</div>' +
      '<p >This is some cat.</p></body>');
  });

  it('dom with content as self contained tag', () => {
    const actual = generateHtml(['head', {}, ['title', {}, 'My First Page'],
      ['link', { rel: 'stylesheet', href: 'styles.css' }]]);
    assert.strictEqual(actual, '<head ><title >My First Page</title>' +
      '<link rel="stylesheet" href="styles.css"/></head>');
  });
});
