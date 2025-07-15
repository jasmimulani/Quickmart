import jwt from 'jsonwebtoken'

 const authUser  = async (req,res,next) =>{

    const {token} = req.cookies;

    if(!token){
        return res.json({success:false, message:'Not Authorized'});
    }

     try {
        const tokenDecod = jwt.verify(token , process.env.JWT_SECRET)
        if(tokenDecod.id){
           req.body = req.body || {};
            req.body.userId = tokenDecod.id
        }else{
            return res.json({success:false, message:'Not Authorized'})
        }
        next();
        
     } catch (error) {
        res.json({success:false, message:error.message})
     }
 }


 export default authUser;