//中间件拦截
const jwt=require('../utile/jwt');
const ress=require('../utile/res')
module.exports=function(app){
    app.use('/api/*',function(req,res,next){//验证token;
        if(req.baseUrl==='/api/user/login'){
            next();
            return;
        }
        let token=req.headers.token;
        try{
            jwt.verifyToken(token);
        }catch(e){
            ress(res,false,450,"token已过期")
            return;
        }
        next()
    })
}