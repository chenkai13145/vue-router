const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3008',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
　　　　
    },
    css: {
        loaderOptions: {
          less: {
            // modifyVars: {
            //   'primary-color': '#1DA57A',
            //   'link-color': '#1DA57A',
            //   'border-radius-base': '2px',
            // },
            javascriptEnabled: true
          }
        }
      }
}