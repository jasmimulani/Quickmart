import Address from "../models/Address.js"


//  add address
export const addAddress = async(req ,res) =>{
    try {
        const {address , userId} = req.body
         await Address.create({...address , userId})
         res.json({success:ture , message:"Address added successfuly"})
    } catch (error) {
        res.josn({success:false , message:error.mrssage});
    }
    
}

//  get address

export const getAddress = async(req,res) =>{

    try {

        const {userId} = req.body
        const address = await Address.find({userId})
        res.josn({success:true , address})
        
    } catch (error) {
        console.log(error.message);
        res.json({success :false , message : error.message})
        
    }

}
