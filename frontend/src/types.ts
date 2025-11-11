export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  type: "news" | "announcement";
  date: string;
  time: string;
  status: "active" | "inactive";
  publishStatus: "publish" | "draft";
  author: string;
  coverImage: string;
  gallery: string[];
}
export interface CreatePost {
  title: string;
  type: "news" | "announcement";
  description: string;
  coverImage: string;
  gallery: string[];
  slug: string | undefined;
}
