import Product from "../models/product.js";
import Order from '../models/Order.js'


//  place order cod:   /api/order/cod
export const placeOrderCOD = async (req , res)=>{
    try {
        const { userId , items , address} = req.body;
        if(!address || items.length === 0){
            return res.json({success: false , message:"invalid data"})
        }

        //  calculate amount using  items
        let amount = await items.reduce(async ()=>{
            const product = await Product.findById(items.product);
            return (await acc) +  product.offerPrice * items.quantity;
        }, 0)

        //  add tax charge(2%)
        amount += Math.floor(amount  * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'COD',
        });

        return res.json({succsess:true, message:'order placed successfully'})
    } catch (error) {
return res.json({success:false , message: error.message});        
        
    }
}

//  get orders by userid : /api/order/user

export const getUserOrder = async (req,res) =>{
    try {

        const {userId} = req.body;
        const  orders = await Order.find({
            userId,
            $or:[{paymentType:'COD'} , {isPaid: true}]
        }).populate('items.product address').sort({CreatedAt: -1});
        res.json({succsess:true , orders});
        
    } catch (error) {
         res.json({success:false , message: error.message});  
    }
}

//  get all order (for seller / admin) : api/order/seller

export const getAllOrder = async (req,res) =>{
    try {
        const  orders = await Order.find({
            $or:[{paymentType:'COD'} , {isPaid: true}]
        }).populate('items.product address').sort({CreatedAt: -1});
        res.json({succsess:true , orders});
        
    } catch (error) {
         res.json({success:false , message: error.message});  
    }
} 

