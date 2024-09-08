import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import hbs from "hbs";



export const register = async (req,res)=>{
    try{
      console.log(req.body);
     const {
      firstName,
      lastName,
        email,
        password,
        friends,
        location,
        occupation

     } = req.body;

     const picturePath = req.file ? req.file.path : '';

     const salt = await bcrypt.genSalt();
     const passwordhash = await bcrypt.hash(password,salt);
     const newuser =new user({
        firstName,
        lastName,
        email,
        password :passwordhash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random()*1000),
        impressions:Math.floor(Math.random()*1000),
     });

     console.log('the new user',newuser)
    
     const usersave = await newuser.save();
     console.log("user saved :",usersave)
     res.status(201).json(usersave);
    }catch(err) {
     res.status(500).json({error:err.massage})
    }
}




export  const login = async(req,res) =>{
   try{
   const  {email,password} = req.body;

   const findUser = await user.findOne({email:email})
   console.log("user in database:",findUser)
   if(!findUser) return res.status(500).send('the email not found ')

   const isMatch = await bcrypt.compare(password,findUser.password)
   if(!isMatch) return res.status(500).send('email or password is wrong')

   const token =jwt.sign({id:findUser._id},process.env.JWT_SECRET);
   delete findUser.password;
   res.status(200).json({token,findUser});
   
   
   }catch(err) {
      console.log(err)
   res.status(500).json({error:err.massage})
   }
};


