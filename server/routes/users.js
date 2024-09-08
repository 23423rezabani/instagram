import express from "express";
import { 
getUser,
getUserFriends,
addRemoveFriend,
}from "../controllers/users.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

router.get('/:id',verifytoken,getUser);
router.get('/:id/friends',verifytoken,getUserFriends);

//patch
router.patch('/:id/:friendId',verifytoken,addRemoveFriend);

export default router;