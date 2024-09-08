import user from "../models/user.js";
import post from "../models/posts.js";



export const createpost =async (req,res)=>{
try{
const {userId,description,picturePath} = req.body;

const user = await user.findById(userId);

const newpost = new post ({
    userId,
    firstname:user.firstname,
    lastname:user.lastname,
    location:user.location,
    description,
    userpicturepath:user.userpicturepath,
    picturePath,
    likes:{},
    comments:[]
})

await newpost.save();

const post = await post.find();

res.status(201).json(post);

} catch(err){
console.log(err)
res.status(500).json({massage:err.massage});   
}

}



export const getfeedposts = async (req,res)=>{
  try{
   const post = await post.find();
   res.status(200).json(post);
  }catch(err) {
   res.status(404).json({massage:err.massage});
  }
}

export const getuserposts = async(req,res)=>{
 try{
 const {userid} = req.params;
 const post = await post.find(userid);
 res.status(200).json(post)
 }catch(err) {
   res.status(404).json({massage:err.massage});
 }
}


/* likes */

export const likepost = async(req,res) =>{
  try{
   const {id} = req.params;
   const {userid} = req.body;

   const post = await post.findById(id);
   const islike = post.likes.get(userid);

   if(islike){
    post.likes.delete(userid);
   }else{
    post.likes.set(userid,true);
   }

   const  updatepost = await post.findByIdAndUpdate(
    id,
    {likes:post.likes},
    {new:true},

   );
    
   res.status(200).json(updatepost);
  } catch(err) {
   res.status(404).json({massage:err.massage});
  }
} 