import { Post, ReturnedPost } from '../types';
import { getRandomNumber } from './getRandomNumber';

export const transformPost = (returnedPost: ReturnedPost): Post => {
  const { id, title, body } = returnedPost;
  return {
    id,
    title,
    body,
    likes: getRandomNumber(),
    dislikes: getRandomNumber(),
  };
};
