
const { override, fixBabelImports,addLessLoader } = require('customize-cra');
// 实现按需打包 antd组件：根据import进来的组件进行打包
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关组件对应的样式
    }),
    // 使用less-loader对源码中的less的变量进行重新覆盖
    addLessLoader({
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#1DA57A' },
         })
    );