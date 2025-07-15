import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  register api
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing Details" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already existing" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, //prevent js to access cookie
      secure: process.env.NODE_ENV === "production", // user secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expration time
    });
    return res.json({
      success: true,
      message: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error.message);

    res.json({ success: false, message: error.message });
  }
};

//  login user api

export const login = async (req, res) => {
  try {
       const {email , password} = req.body;

         if(!email || !password)
          return res.json({success:false, message:'email and password are required'});
        const user = await User.findOne({email});

          if(!user){
            return res.json({success:false, message:'invalid email or password'});
          }
          const ismatch = await bcrypt.compare(password , user.password)
          if(!ismatch)
            return res.json({success:false, message:'invalid email or password'});

          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, //prevent js to access cookie
      secure: process.env.NODE_ENV === "production", // user secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expration time
    });
    return res.json({
      success: true,
      message: { email: user.email, name: user.name },
    });

  } catch (error) {
    console.log(error.message);

    res.json({ success: false, message: error.message });
  }};


  //  auth user 

  export const isAuth = async (req,res) =>{
    try {

      const { userId } = req.body;
      const user = await User.findById(userId).select("-password")

      return res.json({success:true , user})
       
    } catch (error) {
      console.log(error.message);
      res.json({success:false , message:error.message})
      
    }
  }

  //  logout user

  export const logout = async(req,res) =>{
    try {
       res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'node' : "strict",
       });

       return res.json({success:true , message:'logged Out.'})
    } catch (error) {
      console.log(error.message);
      res.json({success:false , message:error.message})
      
      
    }
  }