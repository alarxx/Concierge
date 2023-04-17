module.exports = function runMiddlewares(middlewares, req, res, next, i=0){
    if(i < middlewares.length) {
        console.log("run middlewares", middlewares.length, i)
        middlewares[i](req, res, () => runMiddlewares(middlewares, req, res, next, i+1));
    }
    else {
        console.log("run middlewares", middlewares.length, i, "next")
        next();
    }
}

/*
(req, res, next)=>runMiddlewares(middlewares, req, res, ()=>{
    res.json({})
})
* */