const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'simpleTimeline',
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map'
};
