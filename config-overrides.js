const { override, addBabelPlugins } = require('customize-cra');
const paths = require('react-scripts/config/paths');
const path = require('path');

paths.appBuild = path.join(path.dirname(paths.appBuild), 'docs'); // 修改打包目录
paths.servedPath = './'; // 资源路径改为相对路径
process.env.GENERATE_SOURCEMAP = 'false'; // 取消生成map文件

module.exports = override(
  addBabelPlugins([
    'prismjs',
    {
      languages: ['javascript', 'css', 'markup'],
      plugins: ['line-numbers', 'copy-to-clipboard'],
      theme: 'okaidia',
      css: true
    }
  ])
);
