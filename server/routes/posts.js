import express from "express";
import { getfeedposts,getuserposts,likepost } from "../controllers/posts.js";
import { verifytoken } from "../middleware/auth.js";

const router  = express.Router();



router.get('/',verifytoken,getfeedposts);
router.get('/:userid/posts',verifytoken,getuserposts);

/* Update */
router.patch('/:id/like',verifytoken,likepost);

export default router;
