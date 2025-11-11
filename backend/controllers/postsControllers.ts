import { readDB, writeDB } from "../utils/db";
import { Request, Response } from "express";

export const getAllPosts = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.posts);
};

export const createNewPost = (req: Request, res: Response) => {
  const db = readDB();
  const newPost = {
    id: Date.now(),
    date: new Date().toLocaleDateString("az-AZ"),
    time: new Date().toLocaleTimeString("az-AZ"),
    status: "active",
    publishStatus: "publish",
    author: "snovruzlu",
    ...req.body,
  };
  db.posts.push(newPost);
  writeDB(db);
  res.status(201).json(newPost);
};

export const updatePost = (req: Request, res: Response) => {
  const db = readDB();
  const id = Number(req.params.id);

  db.posts = db.posts.map((post: any) =>
    post.id === id ? { ...post, ...req.body } : post
  );

  writeDB(db);
  res.json({ message: "Updated successfully" });
};

export const deletePost = (req: Request, res: Response) => {
  const db = readDB();
  const id = Number(req.params.id);

  db.posts = db.posts.filter((post: any) => post.id !== id);
  writeDB(db);

  res.json({ message: "Deleted successfully" });
};
