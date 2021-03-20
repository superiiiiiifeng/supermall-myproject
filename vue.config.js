module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //配置别名
        // '@': 'src' 已默认配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'store': '@/store',
        'views': '@/views'
      }
    }
  }
}