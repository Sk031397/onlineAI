const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(proxy.createProxyMiddleware('/eyedetection','http://localhost:5000/eyedetection'))
    app.use(proxy.createProxyMiddleware('/poseestimation','http://localhost:5000/poseestimation'))
    app.use(proxy.createProxyMiddleware('/facemesh','http://localhost:5000/facemesh'))
    app.use(proxy.createProxyMiddleware('/facedetection','http://localhost:5000/facedetection'))
}
