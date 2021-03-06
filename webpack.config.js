const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
var localConfig = require('./appsettings.Development.json');
var prodConfig = require('./appsettings.Production.json');

//Intento de arreglo de pdfmake (ERROR ROBOTO ITALIC)
//var CopyWebpackPlugin = require('copy-webpack-plugin');
//var pdfMakePlugin = new CopyWebpackPlugin([{ from: 'node_modules/pdfmake/build/pdfmake.min.js' }, { from: 'node_modules/pdfmake/build/vfs_fonts.js' }]);

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const appSetting = isDevBuild ? localConfig : prodConfig;
    
    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: {
            modules: [
                path.resolve('./ClientApp'),
                path.resolve('./node_modules')
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        plugins: [new CheckerPlugin(),new ExtractTextPlugin('site.css')]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        module: {
            rules: [
                //{ test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) },
                //{ test: /\.css?$/, loader: 'style-loader!css-loader' }
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            //new ExtractTextPlugin('site2.css'),
                        
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]'), // Point sourcemap entries to the original file locations on disk
                //pdfMakePlugin
            }),
            new webpack.DefinePlugin({
                API_URL: JSON.stringify(appSetting.Urls.ApiUrl),
                WEB_URL: JSON.stringify(appSetting.Urls.WebUrl),
                ISDEV: true
            })
        ] : [
            // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.DefinePlugin({
                    API_URL: JSON.stringify(prodConfig.Urls.ApiUrl),
                    WEB_URL: JSON.stringify(prodConfig.Urls.WebUrl),
                    ISDEV: false
                })
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.tsx' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};