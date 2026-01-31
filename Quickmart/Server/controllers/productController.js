import{v2 as clodinary} from 'cloudinary'
import Product from '../models/product.js'





export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);

    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await clodinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    productData.offerprice = productData.offerPrice;
delete productData.offerPrice;

await Product.create({ ...productData, image: imagesUrl });


    res.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// update product (basic fields; optionally images in future)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatableFields = [
      'name',
      'description',
      'category',
      'price',
      'offerPrice',
      'offerprice',
      'inStock'
    ];

    const update = {};
    for (const key of updatableFields) {
      if (req.body[key] !== undefined) {
        update[key] = req.body[key];
      }
    }

    if (update.offerPrice !== undefined) {
      update.offerprice = update.offerPrice;
      delete update.offerPrice;
    }

    if (typeof update.description === 'string') {
      update.description = update.description.split('\n');
    }

    const updated = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated', product: updated });
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//  get product  
export const ProductList = async (req,res) =>{
  try {
    
      const products = await  Product.find({})
      res.json({success:true, products})
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
     const {id ,inStock} = req.body
     await Product.findByIdAndUpdate(id,{inStock})
     res.json({success:true , message:"Stoke Updated"})
  } catch (error) {
      console.log(error.message);
      res.json({succses:false , message:error.message})
      
  }
} 

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
}