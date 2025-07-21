import{v2 as clodinary} from 'cloudinary'
import Product from '../models/product.js'

//  add product  
export const addProduct = async (req,res) =>{
  try {
    let productData = json.parse(req.body.productData)

    const images = req.files

         let imagesUrl = await Promise.all(
            images.map(async (item) =>{
           let result = await clodinary.uploader.upload(item.path, {resource_type: 'image'});
           return result.secure_url
            })
        )

      await Product.create({...productData, image: imagesUrl})

       res.json({success: true , message:'product added'})
         
    
  } catch (error) {
    console.log(error.message);
    return res.json({success:false , message: error.message})
    
  }
} 


//  get product  
export const ProductList = async (req,res) =>{
  try {
    
      const products = await  Product.find({})
      res.josn({success:true, products})
  } catch (error) {
       console.log(error.message);
       res.json({success:false, message: error.message})  
  }

} 

//  get single product  
export const ProductById = async (req,res) =>{
   try {
    const {id} = req.body
    const product = await Product.findById(id)
    res.json({success: true , product})
     
   } catch (error) {
    console.log(error.message);
    res.json({succses:false , message: error.message})
    
    
   }

} 


//  change product instock
export const changeStock = async (req,res) =>{
  try {
     const {id ,inStoke} = req.body
     await Product.findByIdAndUpdate(id,{inStoke})
     res.json({success:true , message:"Stoke Updated"})
  } catch (error) {
      console.log(error.message);
      res.json({succses:false , message:error.message})
      
  }
} 