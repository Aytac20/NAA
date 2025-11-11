import axios from "axios";
import type { CreatePost, Post } from "../types";

const postsApi = axios.create({
  baseURL: "/api/posts",
});


export const getPosts = async (): Promise<Post[]> => {
  const { data } = await postsApi.get("/");
  return data;
};
export const addPost = async (post: CreatePost): Promise<Post> => {
  const { data } = await postsApi.post("/", post);
  return data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const { data } = await postsApi.put(`/${post.id}`, post);
  return data;
};


export const deletePost = async (id: number): Promise<void> => {
  await postsApi.delete(`/${id}`);
};
