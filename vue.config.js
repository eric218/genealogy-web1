const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/dist/' :
    '/'

module.exports = {
    baseUrl: BASE_URL,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.json', '.vue'],
        },
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    productionSourceMap: true
}