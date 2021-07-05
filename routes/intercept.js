//中间件拦截
const jwt=require('../utile/jwt');
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
            res.send({
                success:false,
                msg:"token已过期",
                code:450
            })
            return;
        }
        next()
    })
}