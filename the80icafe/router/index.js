
const homeCafeRouter = require('./homeCafe')
const productRouter = require('./product')


function route(app) {
    app.use('/', homeCafeRouter)
    app.use('/sanpham', productRouter)
    
}

module.exports = route;