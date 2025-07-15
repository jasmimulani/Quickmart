import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {

       const {sellerToken} = req.cookies;

       if(!sellerToken){
        return res.json({success:false , message:'not Authorized'})
       }
       try {
               const tokenDecod = jwt.verify(sellerToken , process.env.JWT_SECRET)
               if(tokenDecod.email === process.env.SELLER_EMAIL){
                  // req.body = req.body || {};
                  //  req.body.userId = tokenDecod.id
                  next();
               }else{
                   return res.json({success:false, message:'Not Authorized'})
               }
               
            } catch (error) {
               res.json({success:false, message:error.message})
            }
}

export default authSeller