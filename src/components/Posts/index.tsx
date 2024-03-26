import { FC } from 'react';

import { Post } from '../Post';
import { Post as PostType } from '../../types';

import styles from './styles.module.scss';

type PostsProps = {
  posts: PostType[];
};

export const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          isFull={index == 0}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      ))}
    </div>
  );
};
