module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:22302',
            }
        }
    }
}