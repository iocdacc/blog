const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    'prismjs',
    {
      languages: ['javascript', 'css', 'markup'],
      plugins: ['line-numbers','copy-to-clipboard'],
      theme: 'okaidia',
      css: true
    }
  ])
);
