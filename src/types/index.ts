export type ReturnedPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
};
