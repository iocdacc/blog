> 此文章根据 babel 7.9.0 书写
> babel本质的工作是把任意代码编译成浏览器可以运行的代码 甚至于可以将JAVA编译成javascript 当然前提是得有相应的插件 说不定已经有了

## babel 配置

> babel 有两种配置方法,官方推荐使用monorepo 配置法.

### monorepo 配置法
monorepo是多个项目在同一个git仓库的项目

babel.config.json
```json
{
  "presets": [...],
  "plugins": [...]
}
```

babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

### 传统配置法
.babelrc.json
```json
{
  "presets": [...],
  "plugins": [...]
}
```