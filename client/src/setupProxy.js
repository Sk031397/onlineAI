const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(proxy.createProxyMiddleware('/eyedetection','http://localhost:5000/eyedetection'))
    app.use(proxy.createProxyMiddleware('/objectdetection','http://localhost:5000/objectdetection'))
    app.use(proxy.createProxyMiddleware('/facemeshdetection','http://localhost:5000/facemeshdetection'))
    app.use(proxy.createProxyMiddleware('/facedetection','http://localhost:5000/facedetection'))
}