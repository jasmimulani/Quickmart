import User from '../models/User'

export const updateCart = async (req,res) =>{
    try {
        const {userId ,cartItem } = req.body
        await User.findByIdAndUpdate(userId,{cartItem})
        res.json({succses:true ,message:"Cart Updated" })
    } catch (error) {
        console.log(error.message);
        res.json({succses:false , message:error.message})
    }
}