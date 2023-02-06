const authorize=(ReqRole)=>{
    return (ask,give,next)=>{
        if(ReqRole==ask.role){
            next();
        }else{
            give.send("You are not authorized");
        }
    }
}
module.exports={
    authorize
}