const webpack = require('webpack');

module.exports = function override(webpackConfig) {
    // Existing rule for .mjs files
    webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
    });

    // New rule for vfile/core.js
    webpackConfig.module.rules.push({
        test: /node_modules\/vfile\/core\.js/,
        use: [{
            loader: 'imports-loader',
            options: {
                type: 'commonjs',
                imports: ['single process/browser process'],
            },
        }],
    });

    // Adding webpack plugin
    webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ];

    return webpackConfig;
}