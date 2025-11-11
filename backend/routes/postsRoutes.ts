import express from "express";
import { createNewPost, deletePost, getAllPosts, updatePost } from "../controllers/postsControllers";
const router = express.Router();
// GET ALL POSTS
router.get("/",getAllPosts);
// ADD POST
router.post("/", createNewPost);
// ADD PUT
router.put("/:id", updatePost);
// ADD DELETE
router.delete("/:id", deletePost);
export default router;
