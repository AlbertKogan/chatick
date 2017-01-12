const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    entry: './static/js/app.js',
    output: {
        path: path.resolve(__dirname, 'static_compiled'),
        filename: 'bundle.js',
        publicPath: '/static_compiled/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react']
                }
             }
        ]
    }
}
