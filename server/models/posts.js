import mongoose from "mongoose";

const postschema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    location: String,
    description:String,
    picturePath:String,
    userpicturepath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comments:{
        type: Array, 
        default: [],
    }
 
},{timestamps:true});

const post = mongoose.model('post',postschema);

export default post;