module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    indexPath: "index.html",
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false
    }
}