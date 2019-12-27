const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    'prismjs',
    {
      languages: ['javascript', 'css', 'markup'],
      plugins: ['line-numbers'],
      theme: '',
      css: true
    }
  ])
);
