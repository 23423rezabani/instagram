import jwt from "jsonwebtoken";


export const verifytoken =async (req,res,next)=>{

    try{
        let token = req.header("Authorization");

        if(!token){
            res.status(404).send('Access denied')    
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        console.log(err)
     res.status(500).json({error:err.massage})
    }
}