import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import multer from 'multer';
import helmet from "helmet";
import morgan from 'morgan';
import hbs, { create } from "hbs";
import Path  from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { register } from './controllers/auth.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifytoken } from './middleware/auth.js';
import { createpost} from "./controllers/posts.js"
import post from './models/posts.js';
import { users, posts } from './data/index.js';
import user from './models/user.js';


//confguration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const templatepath  = path.join(__dirname,'templates')

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());



const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage})

app.post('/auth/register',upload.single('picture'),register)
app.post('/posts',verifytoken,upload.single('picture'),createpost);

app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);

// app.post('/login',login)
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




        // user.insertMany(users);
        // post.insertMany(posts);
    })
    .catch((err) => {
        console.log(`${err} did not connect`);
    });



