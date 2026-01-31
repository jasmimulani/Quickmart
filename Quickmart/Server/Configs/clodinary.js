import {v2 as clodinary} from 'cloudinary'

const connectClodinary = async (req,res)=>{
    clodinary.config({

        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET

    })
}

export default connectClodinary 